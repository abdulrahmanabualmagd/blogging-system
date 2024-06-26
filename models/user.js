"use strict";
const { Model } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // Role
            User.belongsToMany(models.Role, {
                as: "roles",
                through: "UserRole", // The name of the model itself (not the name of the created table)
                foreignKey: "userId",
                otherKey: "roleId", // (optional)
            });

            // ResetTokens
            User.hasMany(models.PasswordResetToken, {
                as: "resetTokens",
                foreignKey: "userId",
            });

            // VerifyTokens
            User.hasMany(models.EmailVerificationToken, {
                as: "verifyTokens",
                foreignKey: "userId",
            });

            // Post
            User.hasMany(models.Post, {
                as: "posts",
                foreignKey: "userId",
            });

            // Saved Posts
            User.belongsToMany(models.Post, {
                as: "savedPosts",
                through: "SavedPost",
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: uuidv4,
                primaryKey: true,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: true,
                },
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                    notEmpty: true,
                },
            },
            passwordHash: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            phone: {
                type: DataTypes.STRING,
                allowNull: true,
                validate: {
                    is: /^[0-9]+$/i,
                },
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "inactive",
                validate: {
                    isIn: [["active", "inactive", "suspend"]],
                },
            },
            salt: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: "",
            },
        },
        {
            sequelize,
            modelName: "User", // this name can be used as a ref to this model ( in the application )
            tableName: "users",
        }
    );
    return User;
};
