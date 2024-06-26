"use strict";

const fs = require("fs").promises; // Use the promises version of fs
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
require("dotenv").config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("./../config/config")[env];
const Repository = require("./../repository/sequelize-repo");

let db = null;

module.exports = async () => {
    // Singleton
    if (db) return db;

    db = {};

    // Sequelize Connection
    let sequelize;
    if (config.use_env_variable) {
        sequelize = new Sequelize(process.env[config.use_env_variable], config);
    } else {
        sequelize = new Sequelize(config.database, config.username, config.password, config);
    }

    await sequelize.authenticate();
    console.log("# Sequelize Database Connected #");

    // Importing Sequelize Models
    const files = await fs.readdir(__dirname);
    const modelPromises = files
        .filter((file) => {
            return (
                file.indexOf(".") !== 0 && // Avoid hidden files
                file !== basename && // Exclude current file
                path.extname(file) === ".js" && // Check for .js extension
                file.indexOf(".test.js") === -1 // Exclude test files
            );
        })
        .map(async (file) => {
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
            db[model.name] = model;
            db[model.name].repo = new Repository(model); // Repository
        });

    await Promise.all(modelPromises);

    // Sequelize Associations
    Object.keys(db).forEach((modelName) => {
        if (db[modelName].associate) {
            db[modelName].associate(db);
        }
    });

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    return db;
};
