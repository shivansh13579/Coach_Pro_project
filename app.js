const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/adminRoutes");
const coachingRouter = require("./routers/coachingRoutes");
const standardRouter = require("./routers/standardRoutes");
const subjectRouter = require("./routers/subjectRoutes");

const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", adminRouter);
app.use("/api/v1/coachings", coachingRouter);
app.use("/api/v1/standards", standardRouter);
app.use("/api/v1/subject", subjectRouter);

module.exports = app;
