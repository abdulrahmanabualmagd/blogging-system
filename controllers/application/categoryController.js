/*
    Controllers only responsible for the final responses, the services are responsible for the databbase access
*/

const categoryServices = require("./../../services/application/categoryService");

// Get page categories
exports.getPageCategorysController = async (req, res, next) => {
    try {
        // Get User
        const result = await categoryServices.getPageCategoriesService(req.query.page, req.query.size);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get a specific category by ID
exports.getCategoryController = async (req, res, next) => {
    try {
        const result = await categoryServices.getCategoryService(req.params.categoryId);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Get all categories
exports.getAllCategorysController = async (req, res, next) => {
    try {
        // Get User
        const result = await categoryServices.getAllCategoriesService();
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Create a new category
exports.createCategoryController = async (req, res, next) => {
    try {
        const result = await categoryServices.createCategoryService(req.body);
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};

// Edit a category
exports.updateCategoryController = async (req, res, next) => {
    try {
        const result = await categoryServices.updateCategoryService(req.body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};

// Delete a category
exports.deleteCategoryController = async (req, res, next) => {
    try {
        const result = await categoryServices.deleteCategoryService(req.params.categoryId);
        res.status(204).json({ message: "Category deleted successfully", result: result });
    } catch (err) {
        next(err);
    }
};
