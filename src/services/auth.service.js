const User = require("../models/User.model");
const { seedDefaultCategories } = require("./category.service");

const createUser = async ({ email, phone, name, password }) => {
  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    throw new Error("User with given email or phone already exists");
  }

  const user = await User.create({
    email,
    phone,
    name,
    password,
  });

  // Adding default categories to user
  await seedDefaultCategories(user._id);

  return user;
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid Email or Password");
  }

  return user;
};

module.exports = {
  createUser,
  loginUser,
};
