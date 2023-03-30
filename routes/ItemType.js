const express = require("express");
const {
  getAllItemTypesHandler,
  createItemTypeHandler,
  getItemTypeHandler,
} = require("../handlers/ItemTypeHandler");
const itemTypeRoute = express.Router();

itemTypeRoute.get("/", getAllItemTypesHandler);
itemTypeRoute.get("/:id", getItemTypeHandler);
itemTypeRoute.post("/", createItemTypeHandler);

module.exports = itemTypeRoute;
