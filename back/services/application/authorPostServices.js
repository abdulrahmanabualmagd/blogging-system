/*
    Services Responsible for database access and return results to controllers 
*/
const { dbApplication } = require("../../config/db");
const { getAuthenticatedUser } = require("../identity/authService");
const { getPageInation, getPagingData } = require("../../utils/pagInation");

// Get page posts for an author
exports.getPageAuthorPostsService = async (decodedToken, page, size) => {
    try {
        const db = await dbApplication;

        // Calculate the required size and page
        const { limit, offset } = getPageInation(page, size);

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get all author posts
        const authorPost = await db.Post.repo.getAndCountAll({
            limit,
            offset,
            where: {
                userId: user.id,
            },
        });

        if (!authorPost) throw Error("No Post Found");

        return getPagingData(authorPost, page, limit);
    } catch (error) {
        throw Error(error.message);
    }
};

// Get a specific post by ID
exports.getAuthorPostService = async (decodedToken, postId) => {
    try {
        // DB Init
        const db = await dbApplication;

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get Author's Post
        const authorPost = await db.Post.repo.getOne({
            where: {
                id: postId,
                userId: user.id,
            },
        });

        if (!authorPost) throw Error("Post Not Found");

        return authorPost;
    } catch (error) {
        throw Error(error.message);
    }
};

// Get all posts for an author
exports.getAllAuthorPostsService = async (decodedToken) => {
    try {
        const db = await dbApplication;

        // Get Authenticated user
        const user = await getAuthenticatedUser(decodedToken);

        // Get all author posts
        const authorPost = await db.Post.repo.getAll({
            where: {
                userId: user.id,
            },
        });

        if (!authorPost) throw Error("No Post Found");

        return authorPost;
    } catch (error) {
        throw Error(error.message);
    }
};

// Create a new post
exports.createAuthorPostService = async (decodedToken, data) => {
    // Check Data
    const { title, summary, content, categories, status } = data;
    if (!title || !summary || !content) throw Error("Missing arguments");

    try {
        // Init database
        const db = await dbApplication;

        // Get Authenticated User
        const user = await getAuthenticatedUser(decodedToken);

        // Create Post
        const post = new db.Post({
            title,
            summary,
            content,
            coverImage: data.coverImage || "N/A",
            userId: user.id,
            status,
        });

        // Save post
        const savedPost = await post.save();

        const categoriesIds = categories.map((c) => c.id);

        // Add Categories to the Post
        const postCategoryResult = await post.addCategories(categoriesIds);

        return { savedPost };
    } catch (error) {
        throw Error(error.message);
    }
};

// Edit a post
exports.updateAuthorPostService = async (decodedToken, data) => {
    // Check for missings
    if (!user || !data) throw Error("Missing Requirements");

    try {
        // Init database
        const db = await dbApplication;

        const user = await getAuthenticatedUser(decodedToken);

        const updatedPost = await db.Post.repo.update(data, {
            where: {
                id: data.id,
                userId: user.id,
            },
        });

        if (!updatedPost) throw Error("Post Not Fount");

        return updatedPost;
    } catch (error) {
        throw Error(error.message);
    }
};

// Delete a post
exports.deleteAuthorPostService = async (decodedToken, postId) => {
    if (!decodedToken || !postId) throw Error("Missing requirments");

    try {
        const db = await dbApplication;

        const user = await getAuthenticatedUser(decodedToken);

        const result = await db.Post.repo.delete({
            where: {
                id: postId,
                userId: user.id,
            },
        });

        return result;
    } catch (error) {
        throw Error(error.message);
    }
};

// publish a post
exports.publishAuthorPostService = async (decodedToken, id) => {
    // Check for missings
    if (!decodedToken || !id) throw Error("Missing Requirements");

    try {
        // Init database
        const db = await dbApplication;

        const user = await getAuthenticatedUser(decodedToken);

        const updatedPost = await db.Post.repo.update(
            {
                status: "published",
            },
            {
                where: {
                    id: id,
                    userId: user.id,
                },
            }
        );

        if (!updatedPost) throw Error("Post Not Fount or Record not Effected");

        return { message: "Post Published Successfully" };
    } catch (error) {
        throw Error(error.message);
    }
};

// unpublish a post
exports.unpublishAuthorPostService = async (decodedToken, id) => {
    // Check for missings
    if (!decodedToken || !id) throw Error("Missing Requirements");

    try {
        // Init database
        const db = await dbApplication;

        const user = await getAuthenticatedUser(decodedToken);

        const updatedPost = await db.Post.repo.update(
            {
                status: "unpublished",
            },
            {
                where: {
                    id: id,
                    userId: user.id,
                },
            }
        );

        if (!updatedPost) throw Error("Post Not Fount or Record not Effected");

        return { message: "Post Unpublished Successfully" };
    } catch (error) {
        throw Error(error.message);
    }
};
