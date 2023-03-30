const express = require("express");
const {
  getAllItemTypesHandler,
  createItemTypeHandler,
} = require("../handlers/ItemTypeHandler");
const itemTypeRoute = express.Router();

itemTypeRoute.get("/", getAllItemTypesHandler);
itemTypeRoute.post("/", createItemTypeHandler);

module.exports = itemTypeRoute;
