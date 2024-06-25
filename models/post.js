"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        static associate(models) {
            // User
            Post.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
            });

            // Category
            Post.belongsToMany(models.Category, {
                as: "categories",
                through: "PostCategory", // Junction Table Model Name (not the create table in the database)
                foreignKey: "postId",
            });

            // Saved Posts
            Post.belongsToMany(models.User, {
                as: "users",
                through: "SavedPost",
                foreignKey: "postId",
            });
        }
    }
    Post.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            summary: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            coverImage: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            content: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: "Post", // this name can be used as a ref to this model ( in the application )
            tableName: "posts",
        }
    );
    return Post;
};
