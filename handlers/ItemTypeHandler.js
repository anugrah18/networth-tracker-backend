const expressAsyncHandler = require("express-async-handler");
const ItemType = require("../models/ItemType");

const getAllItemTypesHandler = expressAsyncHandler(async (req, res) => {
  try {
    const itemTypes = await ItemType.findAll();
    console.log(itemTypes);
    return res.json(itemTypes);
  } catch (error) {
    return res.error();
  }
});

module.exports = {
  getAllItemTypesHandler,
};
