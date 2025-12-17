require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const cart = [];

const authMiddleware = (req, res, next) => {
  const token = req.cookies.accessToken; // token name = 'token' trong set cookie

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = payload; // lưu payload vào request
    next();
  });
};
router.post("/add", authMiddleware, (req, res) => {
  const { product, quantity } = req.body;

  if (!product || !quantity) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const existItem = cart.find(item => item.id === product.id);

  if (!existItem) {
    cart.push({
      ...product,
      quantity,
    });
  } else {
    existItem.quantity += quantity;
  }

  res.json({
    message: "Added to cart",
    cart,
  });
});

router.get("/", authMiddleware, (req, res) => {
  const user = req.user;
  return res.json(cart );
});

module.exports = router;
