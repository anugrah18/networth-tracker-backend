const express = require("express");
const { getAllItemTypesHandler } = require("../handlers/ItemTypeHandler");
const itemTypeRoute = express.Router();

itemTypeRoute.get("/", getAllItemTypesHandler);

module.exports = itemTypeRoute;
