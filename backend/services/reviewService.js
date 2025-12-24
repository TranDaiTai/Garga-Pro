// services/review.service.js
const prisma = require("../src/lib/prisma");

exports.getReviewsByProductId = async (
  productId,
  { page = 1, limit = 8, rating = null, hasMedia = false, sort = null }
) => {
  if (!productId) throw new Error("productId is required");

  const skip = (Number(page) - 1) * Number(limit);

  /* =======================
     WHERE (lọc dữ liệu)
     ======================= */
  const where = {
    productId: Number(productId),
  };

  // Lọc theo rating
  if (rating) {
    where.rating = Number(rating);
  }

  // Lọc review có hình ảnh
  if (hasMedia === "true" || hasMedia === true) {
    where.images = {
      some: {}, // tồn tại ít nhất 1 image
    };
  }

  /* =======================
     SORT
     ======================= */
  let orderBy = { reviewDate: "desc" }; // mặc định: mới nhất

  if (sort === "rating-asc") orderBy = { rating: "asc" };
  if (sort === "rating-desc") orderBy = { rating: "desc" };
  if (sort === "likes-desc") orderBy = { likes: "desc" };

  /* =======================
     QUERY REVIEWS
     ======================= */
  const [reviews, totalFiltered] = await Promise.all([
    prisma.review.findMany({
      where,
      orderBy,
      skip,
      take: Number(limit),
      include: {
        images: {
          select: {
            id: true,
            imageUrl: true,
          },
        },
        user: {
          select: {
            id: true,
            fullName: true,
          },
        },
      },
    }),
    prisma.review.count({ where }),
  ]);

  /* =======================
     STATS (TÍNH TRÊN ALL REVIEW)
     ======================= */

  // Tổng review
  const totalAll = await prisma.review.count({
    where: { productId: Number(productId) },
  });

  // Đếm theo rating
  const ratingGroup = await prisma.review.groupBy({
    by: ["rating"],
    where: { productId: Number(productId) },
    _count: { rating: true },
  });

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  ratingGroup.forEach((r) => {
    ratingCounts[r.rating] = r._count.rating;
  });

  // Đếm review có hình ảnh
  const mediaCount = await prisma.review.count({
    where: {
      productId: Number(productId),
      images: {
        some: {},
      },
    },
  });

  // Rating trung bình
  const avgResult = await prisma.review.aggregate({
    where: { productId: Number(productId) },
    _avg: { rating: true },
  });

  const averageRating = avgResult._avg.rating || 0;

  /* =======================
     RETURN
     ======================= */
  return {
    stats: {
      total: totalAll,
      ratingCounts,
      mediaCount,
      averageRating: Number(averageRating.toFixed(1)),
    },
    data: reviews,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      totalItems: totalFiltered,
      totalPages: Math.ceil(totalFiltered / limit),
    },
  };
};
