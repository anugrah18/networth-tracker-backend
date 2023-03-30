const expressAsyncHandler = require("express-async-handler");
const ItemType = require("../models/ItemType");

//Get all item types.
const getAllItemTypesHandler = expressAsyncHandler(async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll({
      attributes: ["itemTypeId", "itemCategory"],
    });
    return res.json(itemTypes);
  } catch (error) {
    return res.json(error);
  }
});

//Create an item type.
const createItemTypeHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { itemCategory } = req.body;
    const itemType = await ItemType.create({
      itemCategory: itemCategory,
    });

    return res.json({
      message: `Item Type of category ${itemType.itemCategory} successfully created.`,
    });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = {
  getAllItemTypesHandler,
  createItemTypeHandler,
};
