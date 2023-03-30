const expressAsyncHandler = require("express-async-handler");
const ItemType = require("../models/ItemType");
const responseWithStatus = require("../utils/responseTemplate");

//Get all item types.
const getAllItemTypesHandler = expressAsyncHandler(async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll({
      attributes: ["itemTypeId", "itemCategory"],
    });
    return res.json(itemTypes);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

// Get an item type.
const getItemTypeHandler = expressAsyncHandler(async (req, res) => {
  try {
    itemTypeId = req.params.id;
    const itemType = await ItemType.findByPk(itemTypeId, {
      attributes: ["itemTypeId", "itemCategory"],
    });
    if (itemType === null) {
      return responseWithStatus(
        res,
        `Not found any Item Type with id : ${itemTypeId}`,
        404
      );
    }

    return res.json(itemType);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Create an item type.
const createItemTypeHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { itemCategory } = req.body;
    const itemType = await ItemType.create({
      itemCategory: itemCategory,
    });

    return responseWithStatus(
      res,
      `Item Type of category ${itemType.itemCategory} successfully created.`
    );
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

module.exports = {
  getAllItemTypesHandler,
  getItemTypeHandler,
  createItemTypeHandler,
};
