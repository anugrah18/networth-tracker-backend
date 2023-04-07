const expressAsyncHandler = require("express-async-handler");
const { Record, ItemType } = require("../models/ModelsDefine");
const { itemTypeId } = require("../models/Schemas/ItemTypeSchema");
const responseWithStatus = require("../utils/responseTemplate");

//Get all records.
const getAllRecordsHandler = expressAsyncHandler(async (req, res) => {
  try {
    const userID = req.user.userId;

    //Join Record and Item Type
    const records = await Record.findAll({
      where: { userId: userID },
      attributes: [
        "recordId",
        "recordDate",
        "itemDescription",
        "itemValue",
        "userId",
      ],
      order: ["recordId"],
      include: [
        { model: ItemType, attributes: ["itemTypeId", "itemCategory"] },
      ],
    });

    return res.json(records);
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Create one record
const createRecordHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { recordDate, itemDescription, itemValue, itemTypeId } = req.body;

    const userID = req.user.userId;

    await Record.create({
      recordDate: recordDate,
      itemDescription: itemDescription,
      itemValue: itemValue,
      itemTypeId: itemTypeId,
      userId: userID,
    });

    return responseWithStatus(res, "Record successfully created");
  } catch (error) {
    return responseWithStatus(
      res,
      "Failed to create a record please check your request",
      400
    );
  }
});

module.exports = { getAllRecordsHandler, createRecordHandler };
