const Category = require("../models/Category.model");

const seedDefaultCategories = async (userId) => {
  if (!userId) {
    throw new Error("UserId is required to seed categories");
  }

  const defaultCategories = [
    "Food",
    "Transport",
    "Bills",
    "EMI",
    "Entertainment",
  ];

  const categoriesToInsert = defaultCategories.map((name) => ({
    user: userId,
    name,
  }));

  await Category.insertMany(categoriesToInsert);
};

const getCategories = async (userId) => {
  return Category.find({
    user: userId,
    isActive: true,
  }).sort({ createdAt: -1 });
};

const createCategory = async (userId, data) => {
  return Category.create({
    user: userId,
    ...data,
  });
};

const deleteCategory = async (userId, categoryId) => {
  const category = await Category.findOne({
    _id: categoryId,
    user: userId,
  });

  if (!category) {
    throw new Error("Category not found");
  }

  category.isActive = false;
  await category.save();
};

const updateCategory = async (userId, categoryId, data) => {
  const category = await Category.findOne({
    _id: categoryId,
    user: userId,
    isActive: true,
  });

  if (!category) {
    throw new Error("Category not found to update");
  }

  if (data.name !== undefined) category.name = data.name;
  if (data.icon !== undefined) category.icon = data.icon;
  if (data.color !== undefined) category.color = data.color;

  await category.save();
  return category;
};

module.exports = {
  seedDefaultCategories,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
