const router = require("express").Router();
const { authenticate, authorize } = require("./../../middlewares/auth");
const authorPostControllers = require("./../../controllers/application/authorPostControllers");

// Get Page AuthorPost
router.get("/post/page", authenticate, authorize(["author"]), authorPostControllers.getPageAuthorPostsController);

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

// Publish Post
router.put("/post/publish/:id", authenticate, authorize(["author"]), authorPostControllers.publishAuthorPostController);

// Unpublish Post
router.put("/post/unpublish/:id", authenticate, authorize(["author"]), authorPostControllers.unpublishAuthorPostController);

module.exports = router;
