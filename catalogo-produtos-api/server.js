require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: "10mb" }));


app.get("/api/health", async (req, res) => {
  try {
    // Check MongoDB connection state
    const dbState = mongoose.connection.readyState;
    const states = ["disconnected", "connected", "connecting", "disconnecting"];
    
    res.json({
      status: "API is running 🚀",
      database: states[dbState]
    });
  } catch (error) {
    res.status(500).json({
      status: "API is running but DB check failed ❌",
      error: error.message
    });
  }
});


// Routes
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
