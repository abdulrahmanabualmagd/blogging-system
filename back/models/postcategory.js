"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PostCategory extends Model {
        static associate(models) {
            // In junction tables there are no association definitions to define
        }
    }
    PostCategory.init(
        {
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Post", // The name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Category", // the name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "PostCategory",
            primaryKey: ["postId", "categoryId"], // Composite primary key
            tableName: "posts_categories",
        }
    );
    return PostCategory;
};
