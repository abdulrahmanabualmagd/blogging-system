/*
    Controllers only responsible for the final responses, the services are responsible for the databbase access
*/

const savedPostServices = require("../../services/application/savedPostService");

// Get a specific savedPost by ID
exports.getSavedPostController = async (req, res, next) => {
    try {
        const result = await savedPostServices.getSavedPostService(req.user, req.params.savedPostId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get all savedPosts for an savedPost
exports.getAllSavedPostsController = async (req, res, next) => {
    try {

        // Get User
        const result = await savedPostServices.getAllSavedPostsService(req.user);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Create a new savedPost
exports.createSavedPostController = async (req, res, next) => {
    try {
        const result = await savedPostServices.createSavedPostService(req.user, req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// Delete a savedPost
exports.deleteSavedPostController = async (req, res, next) => {
    try {
        const result = await savedPostServices.deleteSavedPostService(req.user, req.params.savedPostId);
        res.status(204).json({ message: "Post deleted successfully", result: result });
    } catch (err) {
        next(err);
    }
};
