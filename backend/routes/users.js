const express = require('express');
const router = express.Router();

// Giả lập dữ liệu
let users = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@gmail.com', password:'123456789' },
  { id: 2, name: 'Trần Thị B', email: 'b@gmail.com', password:'123456789' }
];

// GET tất cả users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user theo id
router.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Không tìm thấy' });
  res.json(user);
});

// POST tạo user mới
router.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = {
    id: users.length + 1,
    name,
    email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT cập nhật user
router.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'Không tìm thấy' });

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  res.json(user);
});

// DELETE user
router.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Không tìm thấy' });

  users.splice(index, 1);
  res.json({ message: 'Xóa thành công' });
});

module.exports = router;