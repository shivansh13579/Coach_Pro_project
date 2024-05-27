const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/adminRoutes");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", adminRouter);

module.exports = app;
