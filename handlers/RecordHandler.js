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

//Create one record.
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

//Delete a record.
const deleteRecordHandler = expressAsyncHandler(async (req, res) => {
  try {
    const userID = req.user.userId;
    const recordId = req.params.id;
    const deletedRecord = await Record.destroy({
      where: {
        userId: parseInt(userID),
        recordId: parseInt(recordId),
      },
    });

    if (deletedRecord === 0) {
      return responseWithStatus(
        res,
        `Not found any record with id : ${recordId}`
      );
    }

    return responseWithStatus(
      res,
      `Successfully deleted Record with id : ${recordId}`
    );
  } catch (error) {
    return responseWithStatus(res, "Could not delete record", 400);
  }
});

module.exports = {
  getAllRecordsHandler,
  createRecordHandler,
  deleteRecordHandler,
};
