/*
    Services Responsible for database access and return results to controllers 
*/
const { dbApplication } = require("./../../config/db");
const { getAuthenticatedUser } = require("./../identity/authService");

// Get a specific category by ID
exports.getCategoryService = async (categoryId) => {
    try {
        // DB Init
        const db = await dbApplication;

        // Get Author's Category
        const category = await db.Category.repo.getOne({
            where: {
                id: categoryId,
            },
        });

        if (!category) throw Error("Category Not Found");

        return category;
    } catch (error) {
        throw Error(error.message);
    }
};

// Get all categorys for an author
exports.getAllCategoriesService = async () => {
    try {
        const db = await dbApplication;

        // Get all author categorys
        const category = await db.Category.repo.getAll();

        if (!category) throw Error("No Category Found");

        return category;
    } catch (error) {
        throw Error(error.message);
    }
};

// Create a new category
exports.createCategoryService = async ({ name }) => {
    // Check Data
    if (!name) throw Error("Missing arguments");

    try {
        // Init database
        const db = await dbApplication;

        // Create Category
        const category = new db.Category({
            name,
        });

        // Save category
        const savedCategory = await category.save();

        return savedCategory;
    } catch (error) {
        throw Error(error.message);
    }
};

// Edit a category
exports.updateCategoryService = async (data) => {
    // Check for missings
    if (!data.id || !data.name) throw Error("Missing Requirements");

    try {
        // Init database
        const db = await dbApplication;

        const updatedCategory = await db.Category.repo.update(data, {
            where: {
                id: data.id,
            },
        });

        if (!updatedCategory) throw Error("Category Not Fount");

        return updatedCategory;
    } catch (error) {
        throw Error(error.message);
    }
};

// Delete a category
exports.deleteCategoryService = async (categoryId) => {
    if (!categoryId) throw Error("Missing requirments");

    try {
        const db = await dbApplication;

        const result = await db.Category.repo.delete({
            where: {
                id: categoryId,
            },
        });

        return result;
    } catch (error) {
        throw Error(error.message);
    }
};
