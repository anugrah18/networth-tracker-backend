const express = require("express");
const {
  getAllRecordsHandler,
  createRecordHandler,
  deleteRecordHandler,
  updateRecordHandler,
} = require("../handlers/RecordHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const recordRoute = express.Router();

recordRoute.get("/", authMiddleware, getAllRecordsHandler);
recordRoute.post("/", authMiddleware, createRecordHandler);
recordRoute.delete("/:id", authMiddleware, deleteRecordHandler);
recordRoute.put("/:id", authMiddleware, updateRecordHandler);

module.exports = recordRoute;
