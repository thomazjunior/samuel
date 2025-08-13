const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

const demoUser = { email: "admin", password: "admin123" };

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === demoUser.email && password === demoUser.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token });
  }

  res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;
