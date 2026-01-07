const express = require("express");
const app = express();

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "Good" });
});

module.exports = app;
