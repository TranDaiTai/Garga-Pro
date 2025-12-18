const express = require("express");
const router = express.Router();

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    name: "Dầu động cơ Mobil 5W-30",
    category: "Dầu & Chất lỏng",
    price: 350000,
    originalPrice: 380000,
    rating: 4.8,
    reviews: 245,
    sold: 1250,
    image: [
      "/motor-oil-automotivea.jpg",
      "/motor-oil-acutomotive.jpg",
      "/motor-oil-ad  utomotive.jpg",
    ],
    description: "Dầu động cơ chất lượng cao",
    fullDescription:
      "Dầu động cơ Mobil 5W-30 là sản phẩm dầu động cơ chất lượng cao được sản xuất bởi Mobil. Sản phẩm này được thiết kế để cung cấp bảo vệ tối ưu cho động cơ của bạn, đặc biệt là trong các điều kiện nhiệt độ cực đoan.",
    features: [
      "Bảo vệ động cơ hiệu quả",
      "Giảm tiêu hao dầu",
      "Tăng tuổi thọ động cơ",
      "Khả năng làm sạch tốt",
    ],
    specifications: {
      viscosity: "5W-30",
      type: "Synthetic Blend",
      volume: "1 lít",
      engineType: "Động cơ xăng, diesel",
    },
  },
  {
    id: 2,
    name: "Lốp xe Bridgestone 205/65R15",
    category: "Lốp xe",
    price: 1200000,
    originalPrice: 1200000,
    rating: 4.9,
    reviews: 523,
    sold: 890,
    image: [
      "/motor-oil-automotivea.jpg",
      "/motor-oil-acutomotive.jpg",
      "/motor-oil-ad  utomotive.jpg",
    ],

    description: "Lốp xe độ bền cao",
    fullDescription:
      "Lốp xe Bridgestone 205/65R15 là lựa chọn hàng đầu cho xe ô tô. Được thiết kế với công nghệ tiên tiến, lốp này cung cấp khả năng bám đường tuyệt vời và độ an toàn cao.",
    features: [
      "Bám đường tốt",
      "Độ bền cao",
      "Tiết kiệm nhiên liệu",
      "An toàn trong mọi điều kiện",
    ],
    specifications: {
      size: "205/65R15",
      type: "Lốp xe hơi",
      loadRating: "91H",
      warranty: "3 năm",
    },
  },
];
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category, // có thể là string hoặc array: ?category=phone&category=laptop
      minPrice,
      maxPrice,
      rating,
      hasDiscount,
      sort = "relevant",
    } = req.query;

    let query = {};

    // Search tên sản phẩm
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Filter danh mục
    if (category) {
      const categories = Array.isArray(category) ? category : [category];
      query.category = { $in: categories };
    }

    // Filter giá
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter rating (tối thiểu)
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }

    // Có giảm giá
    if (hasDiscount === "true") {
      query.discountPrice = { $exists: true, $ne: null };
    }

    // Sort
    let sortOption = { createdAt: -1 }; // default: relevant ~ newest
    switch (sort) {
      case "newest":
        sortOption = { createdAt: -1 };
        break;
      case "best-selling":
        sortOption = { sold: -1 };
        break;
      case "price-low":
        sortOption = { price: 1 };
        break;
      case "price-high":
        sortOption = { price: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);

    // const [products, total] = await Promise.all([
    //   Product.find(query)
    //     .sort(sortOption)
    //     .skip(skip)
    //     .limit(Number(limit)),
    //   Product.countDocuments(query),
    // ]);

    res.json({
      data: SAMPLE_PRODUCTS,
      pagination: {
        currentPage: Number(page),
        pageSize: Number(limit),
        // totalItems: total,
        // totalPages: Math.ceil(total / Number(limit)),
        // hasNext: Number(page) * Number(limit) < total,
        hasPrev: Number(page) > 1,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  const product = SAMPLE_PRODUCTS.find((item) => item.id === Number(id));

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    });
  }

  return res.json({
    data: product
  })
});
module.exports = router;
