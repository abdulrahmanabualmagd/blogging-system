"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("posts_categories", {
            postId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "posts", // the name of the created table not the model name with capital letter
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            categoryId: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: "categories", // the name of the created table not the model name with capital letter
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("posts_categories");
    },
};
