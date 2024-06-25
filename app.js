const express = require("express");
const { notFoundHandler } = require("./middlewares/notFoundHandler");
const { errorHandler } = require("./middlewares/errorHandler");
const app = express();

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.raw());

// Identity Routes
app.use("/auth", require("./routes/authRouters"));

// Handlers
app.all("*", notFoundHandler);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});









/*
    const db = require("./models/index");
    (async () => {
        const data = await db();
        try {
            await data.sequelize.sync({
                force: true,
            });
        } catch (err) {
            err.message;
        }
    })();
*/
