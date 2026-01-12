const categoryService = require("../services/category.service");

exports.getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories(req.user.id);
    res.json({
      categories,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const { name, icon, color } = req.body;
    if (!name) {
      return res.status(400).json({
        message: "Category name is required",
      });
    }
    const category = await categoryService.createCategory(req.user.id, {
      name,
      icon,
      color,
    });

    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, icon, color } = req.body;

    if (!name && !icon && !color) {
      return res.status(400).json({
        message: "Nothing new to update",
      });
    }

    const category = await categoryService.updateCategory(
      req.user.id,
      categoryId,
      {
        name,
        icon,
        color,
      }
    );

    res.json({ message: "Category updated", category });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    await categoryService.deleteCategory(req.user.id, categoryId);

    res.json({
      message: "Category Deleted",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
