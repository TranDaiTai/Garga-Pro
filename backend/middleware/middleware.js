require('dotenv').config();
const jwt = require("jsonwebtoken");

// Middleware bảo vệ route - kiểm tra access token
exports.authMiddleware = (req, res, next) => {
  // Cách chuẩn: Lấy token từ header Authorization: Bearer <token>
  const {accessToken} = req.cookies;

  if (!accessToken ) {
    return res.status(401).json({
      message: "Không có quyền truy cập. Vui lòng đăng nhập!",
    });
  }


  // Verify token
  jwt.verify(accessToken, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Token không hợp lệ hoặc đã hết hạn",
      });
    }

    // Thành công: gắn thông tin user vào req để route sau dùng
    req.user = payload; // payload thường là { userId, username, ... }
    next(); // QUAN TRỌNG: chỉ gọi next() khi verify thành công
  });
};
