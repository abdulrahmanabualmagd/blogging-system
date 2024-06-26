/*
    Controllers only responsible for the final responses, the services are responsible for the databbase access
*/

const authorPostServices = require("./../../services/application/authorPostService");

// Get page posts for an author
exports.getPageAuthorPostsController = async (req, res, next) => {
    try {
        // Get User
        const result = await authorPostServices.getPageAuthorPostsService(req.query.page, req.query.size);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get a specific post by ID
exports.getAuthorPostController = async (req, res, next) => {
    try {
        const result = await authorPostServices.getAuthorPostService(req.user, req.params.postId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get all posts for an author
exports.getAllAuthorPostsController = async (req, res, next) => {
    try {
        // Get User
        const result = await authorPostServices.getAllAuthorPostsService(req.user);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Create a new post
exports.createAuthorPostController = async (req, res, next) => {
    try {
        const result = await authorPostServices.createAuthorPostService(req.user, req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// Edit a post
exports.updateAuthorPostController = async (req, res, next) => {
    try {
        const result = await authorPostServices.updateAuthorPostService(req.user, req.body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Delete a post
exports.deleteAuthorPostController = async (req, res, next) => {
    try {
        const result = await authorPostServices.deleteAuthorPostService(req.user, req.params.postId);
        res.status(204).json({ message: "Post deleted successfully", result: result });
    } catch (err) {
        next(err);
    }
};
