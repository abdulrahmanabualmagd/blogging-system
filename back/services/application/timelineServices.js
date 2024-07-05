/*
    Services Responsible for database access and return results to controllers 
*/
const { dbApplication } = require("../../config/db");
const { getPageInation, getPagingData } = require("../../utils/pagInation");

// Get all posts for an author
exports.getTimelineServcie = async (page, size) => {
    try {
        const db = await dbApplication;

        // Calculate the required size and page
        const { limit, offset } = getPageInation(page, size);

        // Get categories
        const posts = await db.Post.repo.getAndCountAll({
            where: {
                status: "published",
            },
            order: [["updatedAt", "DESC"]],
            limit,
            offset,
        });

        if (!posts) throw Error("No Post Found");

        return getPagingData(posts, page, limit);
    } catch (error) {
        throw Error(error.message);
    }
};
