const cartService = require("../services/cartService");

/**
 * LẤY GIỎ HÀNG
 */
exports.getCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập",
      });
    }

    // Lấy query params: page, limit, sort, search
    const { page = 1, limit = 8, sort = "newest", search = "" } = req.query;

    const result = await cartService.getCart(user.userId, {
      page: Number(page),
      limit: Number(limit),
      sort,
      search: search.trim(),
    });

    return res.status(200).json({
      success: true,
      data: { ...result }, // cart, pagination, message
    });
  } catch (err) {
    console.error("Error in getCart controller:", err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi lấy giỏ hàng",
    });
  }
};

/**
 * THÊM SẢN PHẨM VÀO GIỎ HÀNG
 */
exports.addToCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập",
      });
    }

    const { productId, quantity = 1 } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Thiếu productId hoặc số lượng không hợp lệ",
      });
    }

    const result = await cartService.addToCart(user.userId, {
      productId: Number(productId),
      quantity: Number(quantity),
    });

    return res.json({ success: true, data: { ...result } });
  } catch (err) {
    console.error("Error in addToCart controller:", err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi thêm vào giỏ hàng",
    });
  }
};

/**
 * CẬP NHẬT SỐ LƯỢNG ITEM TRONG GIỎ
 */
exports.updateCartItem = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập",
      });
    }

    const { productId, quantity } = req.body;

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Thiếu thông tin hoặc số lượng không hợp lệ",
      });
    }

    const result = await cartService.updateCartItem(user.userId, {
      productId: Number(productId),
      quantity: Number(quantity),
    });

    return res.json({ success: true, data: { ...result } });
  } catch (err) {
    console.error("Error in updateCartItem controller:", err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi cập nhật giỏ hàng",
    });
  }
};

/**
 * XÓA ITEM KHỎI GIỎ HÀNG
 */
exports.removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập",
      });
    }

    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Thiếu productId",
      });
    }

    const result = await cartService.removeFromCart(
      user.userId,
      Number(productId)
    );

    return res.json({ success: true, data: { ...result } });
  } catch (err) {
    console.error("Error in removeFromCart controller:", err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xóa item khỏi giỏ hàng",
    });
  }
};

/**
 * (TÙY CHỌN) XÓA TOÀN BỘ GIỎ HÀNG
 */
exports.clearCart = async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Không có quyền truy cập",
      });
    }

    // Xóa tất cả cart items của user
    await cartService.clearCart(user.userId);

    return res.status(200).json({
      success: true,
      message: "Xóa toàn bộ giỏ hàng thành công",
    });
  } catch (err) {
    console.error("Error in clearCart controller:", err);
    return res.status(500).json({
      success: false,
      message: "Có lỗi xảy ra khi xóa giỏ hàng",
    });
  }
};
