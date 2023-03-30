const express = require("express");
const {
  getAllItemTypesHandler,
  createItemTypeHandler,
  getItemTypeHandler,
  deleteItemTypeHandler,
  updateItemTypeHandler,
} = require("../handlers/ItemTypeHandler");
const itemTypeRoute = express.Router();

itemTypeRoute.get("/", getAllItemTypesHandler);
itemTypeRoute.get("/:id", getItemTypeHandler);
itemTypeRoute.post("/", createItemTypeHandler);
itemTypeRoute.delete("/:id", deleteItemTypeHandler);
itemTypeRoute.put("/:id", updateItemTypeHandler);

module.exports = itemTypeRoute;
