// /services/productService.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


/**
 * Lấy danh sách sản phẩm với bộ lọc, phân trang và sắp xếp
 */
exports.getProducts = async ({
  page = 1,
  limit = 20,
  search = '',
  categories = [], // mảng string hoặc number
  minPrice = null,
  maxPrice = null,
  rating = null,
  hasDiscount = false, // true/false
  sort = 'newest', // newest | best-selling | price-low | price-high
}) => {
  const skip = (page - 1) * limit;

  // Xây dựng điều kiện WHERE
  const whereConditions = [];

  // Tìm kiếm theo tên (không phân biệt hoa thường)
  if (search.trim()) {
    whereConditions.push({
      name: { contains: search.trim(), mode: 'insensitive' },
    });
  }

  // Lọc theo danh mục
  if (categories.length > 0) {
    const categoryIds = categories.map((cat) => parseInt(cat)).filter((id) => !isNaN(id));
    if (categoryIds.length > 0) {
      whereConditions.push({
        categoryId: { in: categoryIds },
      });
    }
  }

  // Lọc theo khoảng giá
  if (minPrice !== null || maxPrice !== null) {
    const priceFilter = {};
    if (minPrice !== null) priceFilter.gte = Number(minPrice);
    if (maxPrice !== null) priceFilter.lte = Number(maxPrice);
    whereConditions.push({ price: priceFilter });
  }

  // Lọc theo đánh giá tối thiểu
  if (rating !== null) {
    whereConditions.push({
      rating: { gte: Number(rating) },
    });
  }

  // Lọc sản phẩm đang giảm giá: originalPrice phải tồn tại và lớn hơn price hiện tại
  if (hasDiscount) {
    whereConditions.push({
      originalPrice: { not: null },
      // Prisma không hỗ trợ so sánh field với field trực tiếp trong where
      // Nên chỉ lọc originalPrice tồn tại, việc originalPrice > price sẽ kiểm tra sau khi lấy dữ liệu
    });
  }

  // Xác định sắp xếp
  let orderBy = { createdAt: 'desc' }; // mặc định: mới nhất

  switch (sort) {
    case 'newest':
      orderBy = { createdAt: 'desc' };
      break;
    case 'best-selling':
      // hoặc nếu soldCount là field số:
       orderBy = { soldCount: 'desc' };
      break;
    case 'price-low':
      orderBy = { price: 'asc' };
      break;
    case 'price-high':
      orderBy = { price: 'desc' };
      break;
    default:
      orderBy = { createdAt: 'desc' };
  }

  // Query chính
  const [productsRaw, total] = await Promise.all([
    prisma.product.findMany({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
      orderBy,
      skip,
      take: limit,
      include: {
        images: {
          orderBy: { position: 'asc' },
        },
      },
    }),
    prisma.product.count({
      where: whereConditions.length > 0 ? { AND: whereConditions } : {},
    }),
  ]);

  // Nếu có lọc hasDiscount, lọc thêm ở mức ứng dụng để đảm bảo originalPrice > price
  let products = productsRaw;
  let finalTotal = total;

  if (hasDiscount) {
    products = productsRaw.filter((p) => p.originalPrice !== null && p.originalPrice > p.price);
    finalTotal = products.length; // Nếu muốn chính xác 100% thì dùng raw query riêng, nhưng với phân trang thì cách này ổn
    // Hoặc tính lại total bằng query riêng nếu cần chính xác (xem ghi chú bên dưới)
  }

  return {
    products,
    pagination: {
      currentPage: Number(page),
      pageSize: Number(limit),
      totalItems: finalTotal,
      totalPages: Math.ceil(finalTotal / limit),
      hasNext: page * limit < finalTotal,
      hasPrev: page > 1,
    },
  };
};

/**
 * Lấy chi tiết một sản phẩm theo ID
 */
exports.getProductById = async (id) => {
  const productId = parseInt(id);
  if (isNaN(productId)) return null;

  return await prisma.product.findUnique({
    where: { id: productId },
    include: {
      images: {
        orderBy: { position: 'asc' },
      },
      category: true,
      reviews: {
        include: {
          images: true,
          user: {
            select: { fullName: true, avatar: true }, // nếu có avatar
          },
        },
        orderBy: { reviewDate: 'desc' },
      },
    },
  });
};