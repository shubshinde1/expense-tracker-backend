const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/auth.middleware");
const categoryController = require("../controllers/category.controller");

router.use(authMiddleware);

router.get("/", categoryController.getCategories);
router.post("/", categoryController.createCategory);
router.delete("/:id", categoryController.deleteCategory);
router.put("/:id",categoryController.updateCategory)

module.exports = router;
