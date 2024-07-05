"use strict";

const { v4: uuidv4 } = require("uuid");
const { Sequelize } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const categories = [
            {
                name: "Technology",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Travel",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Food",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Fashion",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Health & Fitness",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Lifestyle",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Parenting",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Beauty",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Sports",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                name: "Finance",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        ];

        await queryInterface.bulkInsert("categories", categories);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("categories", null, {});
    },
};
