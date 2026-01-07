const { create } = require("../models/User.model");
const authSerivice = require("../services/auth.service");

exports.signup = async (req, res) => {
  try {
    const { email, phone, name, password } = req.body;

    if (!email || !phone || !name || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const user = await authSerivice.createUser({
      email,
      phone,
      name,
      password,
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        phone: user.phone,
        name: user.name,
        ProfilerUrl: user.ProfilerUrl,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
