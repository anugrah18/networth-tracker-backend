const express = require("express");
const {
  getAllRecordsHandler,
  createRecordHandler,
} = require("../handlers/RecordHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const recordRoute = express.Router();

recordRoute.get("/", authMiddleware, getAllRecordsHandler);
recordRoute.post("/", authMiddleware, createRecordHandler);

module.exports = recordRoute;
