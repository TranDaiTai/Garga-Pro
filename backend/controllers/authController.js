// require('dotenv').config();
const jwt = require("jsonwebtoken");
const authService = require("../services/authService"); // giả sử bạn có file api gọi đến DB hoặc service xác thực

// Đăng nhập
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Kiểm tra xem có gửi username và password không
    if (!username || !password) {
      return res.status(400).json({ // 400 Bad Request hợp lý hơn 401 ở đây
        message: "Vui lòng nhập tài khoản và mật khẩu",
      });
    }

    // Gọi API/service để xác thực người dùng
    const result = await authService.login(username, password); // truyền username, password vào

    if (!result?.user) {
      return res.status(401).json({
        message: "Tài khoản hoặc mật khẩu không đúng",
      });
    }

    // Tạo access token và refresh token
    const accessToken = jwt.sign(
      { userId: result.user.id, username: result.user.username }, // chỉ lưu những thông tin cần thiết
      process.env.JWT_SECRET, // sửa chính tả: SECRECT → SECRET
      { expiresIn: "15m" } // access token hết hạn sau 15 phút (tùy chỉnh theo nhu cầu)
    );

    const refreshToken = jwt.sign(
      { userId: result.user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" } // refresh token sống lâu hơn, ví dụ 7 ngày
    );

    // Có thể lưu refreshToken vào httpOnly cookie để tăng bảo mật (khuyến nghị)
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // chỉ gửi qua HTTPS ở production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.json({
      user: result.user,
      accessToken,
      message: "Đăng nhập thành công",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Có lỗi xảy ra khi đăng nhập",
    });
  }
};

// Refresh token - cấp lại access token mới
exports.refreshToken = async (req, res) => {
  // Lấy refreshToken từ cookie (an toàn hơn lấy từ body)
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Không tìm thấy refresh token",
    });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {
    if (err) {
      return res.status(401).json({
        message: "Refresh token không hợp lệ hoặc đã hết hạn",
      });
    }

    // Tạo access token mới từ payload của refresh token
    const newAccessToken = jwt.sign(
      { userId: payload.userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );


    // ddeer demo backend
     res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // chỉ gửi qua HTTPS ở production
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    res.json({
      accessToken: newAccessToken,
      message: "Cấp lại access token thành công",
    });
  });
};

// Đăng xuất
exports.logout =async (req, res) => {
  // Cách đơn giản nhất phía server: xóa cookie refreshToken
  // (Access token sẽ tự hết hạn nhờ expiresIn ngắn)
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.json({
    message: "Đăng xuất thành công",
  });
};