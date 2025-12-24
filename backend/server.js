const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');

// server.js
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');   // thêm dòng này
const productRoutes = require('./routes/product')
const cartRouters = require('./routes/cart')


const app = express();
const PORT = 5000;

// Middleware
app.use(cors(
  {origin: 'http://localhost:5173', // frontend URL
  credentials: true, // cho phép gửi cookie
}
));
app.use(cookieParser()); // phải dùng trước router

app.use(express.json());


// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);  
app.use('/api/products',productRoutes) // thêm dòng này
app.use('/api/carts',cartRouters)
// Route test
app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
