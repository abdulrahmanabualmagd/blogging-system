"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        static associate(models) {
            // Post
            Category.belongsToMany(models.Post, {
                as: "posts",
                through: "PostCategory", // Junction Table Model Name (not the create table in the database)
                foreignKey: "categoryId",
            });
        }
    }
    Category.init(
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: "Category", // this name can be used as a ref to this model ( in the application )
            tableName: "categories",
        }
    );
    return Category;
};
