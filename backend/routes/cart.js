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

  const existItem = cart.find((item) => item.id === product.id);

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
  // const { user } = req.body;
  return res.json(cart);
});
router.post("/remove", authMiddleware, (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const existItem = cart.find((item) => item.id === productId);

  if (!existItem) {
    return res.status(404).json({ message: "Item not found in cart" });
  }

  cart = cart.filter((item) => item.id !== productId);

  res.json({
    message: "Removed item from cart",
    cart,
  });
});

router.post("/update", authMiddleware, (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const index = cart.findIndex(item => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found in cart" });
  }

  cart[index].quantity = quantity;

  res.json({
    message: "Cart updated",
    cart,
  });
});

module.exports = router;
