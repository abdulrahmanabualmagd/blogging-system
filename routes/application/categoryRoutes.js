const router = require("express").Router();
const { authenticate, authorize } = require("./../../middlewares/auth");
const categoryControllers = require("./../../controllers/application/categoryController");

// Get Page Categories
router.get("/page", authenticate, authorize(["author"]), categoryControllers.getPageCategorysController);

// Get Category by Id
router.get("/:categoryId", authenticate, authorize(["author"]), categoryControllers.getCategoryController);

// Get All Categories
router.get("/", authenticate, authorize(["author"]), categoryControllers.getAllCategorysController);

// Create a new category
router.post("/", authenticate, authorize(["author"]), categoryControllers.createCategoryController);

// Edit a category
router.put("/", authenticate, authorize(["author"]), categoryControllers.updateCategoryController);

// Delete a category
router.delete("/:categoryId",authenticate,authorize(["author"]),categoryControllers.deleteCategoryController);

module.exports = router;
