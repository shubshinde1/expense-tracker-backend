const express = require("express");
const app = express();

const authMiddleware = require("./middlewares/auth.middleware");

const authRoutes = require("./routes/auth.routes");

const categoryRoutes = require("./routes/category.routes");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Good" });
});

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "You are authorised",
    user: req.user,
  });
});

app.use("/api/categories", categoryRoutes);

module.exports = app;
