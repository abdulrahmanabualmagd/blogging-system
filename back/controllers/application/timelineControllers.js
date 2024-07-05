/*
    Controllers only responsible for the final responses, the services are responsible for the databbase access
*/

const timelineServcies = require("../../services/application/timelineServices");

// Get page categories
exports.getTimelineController = async (req, res, next) => {
    try {
        // Get User
        const result = await timelineServcies.getTimelineServcie(req.query.page, req.query.size);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
