const router = require("express").Router();
const { authenticate, authorize } = require("./../../middlewares/auth");
const authorPostControllers = require("./../../controllers/application/authorPostController");

// Get Post by Id
router.get("/post/:postId", authenticate, authorize(["author"]), authorPostControllers.getAuthorPostController);

// Get All Posts
router.get("/post", authenticate, authorize(["author"]), authorPostControllers.getAllAuthorPostsController);

// Create a new post
router.post("/post", authenticate, authorize(["author"]), authorPostControllers.createAuthorPostController);

// Edit a post
router.put("/post", authenticate, authorize(["author"]), authorPostControllers.updateAuthorPostController);

// Delete a post
router.delete("/post/:postId", authenticate, authorize(["author"]), authorPostControllers.deleteAuthorPostController);

module.exports = router;
