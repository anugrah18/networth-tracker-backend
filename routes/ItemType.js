const express = require("express");
const {
  getAllItemTypesHandler,
  createItemTypeHandler,
  getItemTypeHandler,
  deleteItemTypeHandler,
  updateItemTypeHandler,
} = require("../handlers/ItemTypeHandler");
const authMiddleware = require("../middlewares/auth/authMiddleware");
const itemTypeRoute = express.Router();

itemTypeRoute.get("/", getAllItemTypesHandler);
itemTypeRoute.get("/:id", getItemTypeHandler);
itemTypeRoute.post("/", authMiddleware, createItemTypeHandler);
itemTypeRoute.delete("/:id", authMiddleware, deleteItemTypeHandler);
itemTypeRoute.put("/:id", authMiddleware, updateItemTypeHandler);

module.exports = itemTypeRoute;
