"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class SavedPost extends Model {
        static associate(models) {}
    }
    SavedPost.init(
        {
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "User", // The name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "Post", // the name of the model itself (not the name of the created table)
                    key: "id",
                },
            },
        },
        {
            sequelize,
            modelName: "SavedPost",
            primaryKey: ["userId", "postId"], // Composite primary key
            tableName: "saved_posts",
        }
    );
    return SavedPost;
};
