const router = require("express").Router();
const { authenticate, authorize } = require("./../../middlewares/auth");
const timelineControllers = require("./../../controllers/application/timelineControllers");

// Get Page AuthorPost
router.get("/", authenticate, authorize(["author"]), timelineControllers.getTimelineController);

module.exports = router;
