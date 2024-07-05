const router = require("express").Router();
const { authenticate, authorize } = require("../../middlewares/auth");
const savedPostControllers = require("./../../controllers/application/savedPostControllers");

// Get All Posts
router.get("/page", authenticate, authorize(["author","user"]), savedPostControllers.getPageSavedPostsController);

// Get SavedPost by Id
router.get("/:savedPostId", authenticate, authorize(["author","user"]), savedPostControllers.getSavedPostController);

// Get All Posts
router.get("/", authenticate, authorize(["author","user"]), savedPostControllers.getAllSavedPostsController);

// Create a new savedPost
router.post("/", authenticate, authorize(["author","user"]), savedPostControllers.createSavedPostController);

// Delete a savedPost
router.delete("/:savedPostId", authenticate, authorize(["author","user"]), savedPostControllers.deleteSavedPostController);

module.exports = router;
