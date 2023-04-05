const expressAsyncHandler = require("express-async-handler");
const { Record, ItemType } = require("../models/ModelsDefine");
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

module.exports = { getAllRecordsHandler };
