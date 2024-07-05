"use strict";
const { v4: uuidv4 } = require("uuid");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("roles", [
            {
                id: uuidv4(),
                name: "admin",
                description: "Admin role",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                id: uuidv4(),
                name: "author",
                description: "User role",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                id: uuidv4(),
                name: "user",
                description: "User role",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("roles", null, {});
    },
};
