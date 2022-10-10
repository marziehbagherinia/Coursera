const express = require("express");
const auth = require("../routes/auth");
const users = require("../routes/users");
const courses = require("../routes/courses");
const error = require("../middleware/error");

module.exports = function(app) {
    app.use(express.json());
    app.use("/api/courses", courses);
    app.use("/api/users", users);
    app.use("/api/auth", auth);
    app.use(error);
}