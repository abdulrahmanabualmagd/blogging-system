/*
    Services Responsible for database access and return results to controllers 
*/
const { dbApplication } = require("../../config/db");
const { getAuthenticatedUser } = require("../identity/authService");
const { getPageInation, getPagingData } = require("../../utils/pagInation");

exports.getPageSavedPostsService = async (decodedToken, page, size) => {
    try {
        const db = await dbApplication;

        // Calculate the required size and page
        const { limit, offset } = getPageInation(page, size);

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get all savedPost posts
        const savedPost = await db.SavedPost.repo.getAndCountAll({
            limit,
            offset,
            where: {
                userId: user.id,
            },
        });

        if (!savedPost) throw Error("No SavedPost Found");

        return getPagingData(savedPost, page, limit);;
    } catch (error) {
        throw Error(error.message);
    }
};

// Get a specific savedPost by ID
exports.getSavedPostService = async (decodedToken, postId) => {
    try {
        // DB Init
        const db = await dbApplication;

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get SavedPost's SavedPost
        const savedPost = await db.SavedPost.repo.getOne({
            where: {
                postId,
                userId: user.id,
            },
        });

        if (!savedPost) throw Error("SavedPost Not Found");

        return savedPost;
    } catch (error) {
        throw Error(error.message);
    }
};

// Get all posts for an savedPost
exports.getAllSavedPostsService = async (decodedToken) => {
    try {
        const db = await dbApplication;

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get all savedPost posts
        const savedPost = await db.SavedPost.repo.getAll({
            where: {
                userId: user.id,
            },
        });

        if (!savedPost) throw Error("No SavedPost Found");

        return savedPost;
    } catch (error) {
        throw Error(error.message);
    }
};

// Create a new savedPost
exports.createSavedPostService = async (decodedToken, { postId }) => {
    if (!postId) throw Error("Missing requirements");

    try {
        // Init database
        const db = await dbApplication;

        // Get Authenticated User
        const user = await getAuthenticatedUser(decodedToken);

        // Create SavedPost
        const savedPost = new db.SavedPost({
            postId,
            userId: user.id,
        });

        // Save savedPost
        const savedPostResult = await savedPost.save();

        return savedPostResult;
    } catch (error) {
        throw Error(error.message);
    }
};

// Delete a savedPost
exports.deleteSavedPostService = async (decodedToken, postId) => {
    if (!decodedToken || !postId) throw Error("Missing requirments");

    try {
        const db = await dbApplication;

        const user = await getAuthenticatedUser(decodedToken);

        const result = await db.SavedPost.repo.delete({
            where: {
                postId,
                userId: user.id,
            },
        });

        return result;
    } catch (error) {
        throw Error(error.message);
    }
};
