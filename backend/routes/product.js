const express = require('express'); 
const router= express.Router();

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
    image: "/motor-oil-automotive.jpg",
    description: "Dầu động cơ chất lượng cao",
    fullDescription:
      "Dầu động cơ Mobil 5W-30 là sản phẩm dầu động cơ chất lượng cao được sản xuất bởi Mobil. Sản phẩm này được thiết kế để cung cấp bảo vệ tối ưu cho động cơ của bạn, đặc biệt là trong các điều kiện nhiệt độ cực đoan.",
    features: ["Bảo vệ động cơ hiệu quả", "Giảm tiêu hao dầu", "Tăng tuổi thọ động cơ", "Khả năng làm sạch tốt"],
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
    image: "/tire-wheel-automotive.jpg",
    description: "Lốp xe độ bền cao",
    fullDescription:
      "Lốp xe Bridgestone 205/65R15 là lựa chọn hàng đầu cho xe ô tô. Được thiết kế với công nghệ tiên tiến, lốp này cung cấp khả năng bám đường tuyệt vời và độ an toàn cao.",
    features: ["Bám đường tốt", "Độ bền cao", "Tiết kiệm nhiên liệu", "An toàn trong mọi điều kiện"],
    specifications: {
      size: "205/65R15",
      type: "Lốp xe hơi",
      loadRating: "91H",
      warranty: "3 năm",
    },
  },
]


router.get('/',(req,res)=>{
    
  res.json(SAMPLE_PRODUCTS);

})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const product = SAMPLE_PRODUCTS.find(
    (item) => item.id === Number(id)
  )

  if (!product) {
    return res.status(404).json({
      message: "Không tìm thấy sản phẩm",
    })
  }

  res.json(product)
})
module.exports = router