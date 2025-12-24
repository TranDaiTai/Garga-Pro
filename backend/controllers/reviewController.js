const reviewService = require("../services/reviewService");
exports.getReviewsByProductId = async (req, res) => {
  const { productId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 8;
  const sort = req.query.sort || null;
  const hasMedia = req.query.hasMedia || false;
  const rating = req.query.rating || null;

  try {
    const reviewList = await reviewService.getReviewsByProductId(productId, {
      page,
      limit,
      sort,
      hasMedia,
      rating,
    });
    res.json({
      success: true,
      data: {
        reviews: reviewList.data,
        pagination: reviewList.pagination,
        stats: reviewList.stats,
      },
    });
  } catch (err) {
    console.error(err);
    res.json({
      success: false,
      message: " cos loi khi get du lieu review",
    });
  }
};
