// backend/routes/auth.js
const express = require('express');
const router = express.Router();

// Dữ liệu giả lập (bạn đang có ở users.js, nên import chung hoặc copy lại)
let users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', password: '123456789' },
  { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', password: '123456789' },
  { id: 3, name: 'admin',       email: 'admin@gmail.com', password: 'admin123' },
  { id: 4, name: 'admin',       email: 'trandaitai2005@gmail.com', password: '123456789' }

];


router.get('/',(req,res) =>{
  res.send("API is running. tai dez..");
  }
)
// POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu' });
  }

  // Tìm user theo email
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Email không tồn tại' });
  }

  // So sánh password (ở đây là plain text vì mock)
  if (user.password !== password) {
    return res.status(401).json({ message: 'Mật khẩu sai' });
  }

  // Đăng nhập thành công → trả về thông tin user (không trả password)
  const { password: _, ...userWithoutPassword } = user;

  res.json({
    message: 'Đăng nhập thành công',
    user: userWithoutPassword,
    // accessToken: 'fake-jwt-token-abc123' // sau này bạn thay bằng JWT thật
  });
});

module.exports = router;