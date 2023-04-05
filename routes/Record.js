const express = require("express");
const { getAllRecordsHandler } = require("../handlers/RecordHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const recordRoute = express.Router();

recordRoute.get("/", authMiddleware, getAllRecordsHandler);

module.exports = recordRoute;
