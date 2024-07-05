/*
    Services uses this [medium] to access the db
*/
require("dotenv").config();

// Get the env variable to know which datbase you want to use
const applicationPath = `./../models/index`;

// Import the application db
const dbApplication = require(applicationPath)();

module.exports = {
    dbApplication,
};
