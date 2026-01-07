const User = require("../models/User.model");

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

  return user;
};

module.exports = {
  createUser,
};
