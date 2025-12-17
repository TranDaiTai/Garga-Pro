require('dotenv').config();
const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const session = []

let users = [
  { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com", password: "123456789" },
  { id: 2, name: "Trần Thị B", email: "b@gmail.com", password: "123456789" },
  { id: 3, name: "admin", email: "admin@gmail.com", password: "admin123" },
  { id: 4, name: "admin", email: "trandaitai2005@gmail.com", password: "123456789" },
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
  }

  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Email không tồn tại" });
  }

  if (user.password !== password) {
    return res.status(401).json({ message: "Mật khẩu sai" });
  }

  // 👉 TẠO JWT
 const accesstoken = jwt.sign(
  { id: user.id, email: user.email },
  process.env.JWT_SECRET
);

const refreshtoken = jwt.sign(
  { id: user.id },
  process.env.JWT_REFRESH_SECRET
);


  // 👉 SET COOKIE
  res.cookie("accessToken", accesstoken, {
    httpOnly: true,     // JS không đọc được
    sameSite: "lax",    // dev ok
    maxAge: 15000, // 7 ngày
  });
  
res.cookie("refreshToken", refreshtoken, {
  httpOnly: true,
  sameSite: "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
});

  const { password: _, ...userWithoutPassword } = user;

  res.json({
    message: "Đăng nhập thành công",
    user: userWithoutPassword,
  });
});

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken // token name = 'token' trong set cookie

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    req.user = payload; // lưu payload vào request
    next();
  });
};

router.post("/refresh", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: "No refresh token" });
  }

  jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, payload) => {

    if (err) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }

    const newAccessToken = jwt.sign(
      { id: payload.id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.json({ message: "Access token refreshed" });
  });
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Xác thực thành công',
    user: req.user, // thông tin từ JWT
  });
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.json({ message: "Logged out" });
});


module.exports = router;
