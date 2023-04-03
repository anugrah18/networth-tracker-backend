const expressAsyncHandler = require("express-async-handler");
const { ItemType } = require("../models/ModelsDefine");
const responseWithStatus = require("../utils/responseTemplate");

//Get all item types.
const getAllItemTypesHandler = expressAsyncHandler(async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll({
      attributes: ["itemTypeId", "itemCategory"],
      order: ["createdAt"],
    });
    return res.json(itemTypes);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Get an item type.
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
    //If user is not an admin.
    if (!req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

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

//Delete an item type.
const deleteItemTypeHandler = expressAsyncHandler(async (req, res) => {
  try {
    //If user is not an admin.
    if (!req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

    ID = req.params.id;
    const deletedItemType = await ItemType.destroy({
      where: {
        itemTypeId: ID,
      },
    });

    if (deletedItemType === 0) {
      return responseWithStatus(
        res,
        `Not found any Item Type to delete with id : ${ID}`,
        404
      );
    }

    return responseWithStatus(
      res,
      `Successfully deleted Item Type with id : ${ID}`
    );
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Update an item type.
const updateItemTypeHandler = expressAsyncHandler(async (req, res) => {
  try {
    //If user is not an admin.
    if (!req.user.isAdmin) {
      return responseWithStatus(res, "Not authorized", 401);
    }

    ID = req.params.id;
    const { itemCategory } = req.body;
    const updatedItemType = await ItemType.update(
      { itemCategory: itemCategory },
      { where: { itemTypeId: ID } }
    );

    if (updatedItemType == 0) {
      return responseWithStatus(
        res,
        `Not found any Item Type to update with id : ${ID}`,
        404
      );
    }

    return responseWithStatus(
      res,
      `Successfully updated Item Type with id : ${ID}`
    );
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

module.exports = {
  getAllItemTypesHandler,
  getItemTypeHandler,
  createItemTypeHandler,
  deleteItemTypeHandler,
  updateItemTypeHandler,
};
