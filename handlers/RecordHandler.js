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
    return responseWithStatus(res, error.message, 400);
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
    return responseWithStatus(res, error.message, 400);
  }
});

//Update a record.
const updateRecordHandler = expressAsyncHandler(async (req, res) => {
  try {
    const { recordDate, itemDescription, itemValue, itemTypeId } = req.body;

    const userID = req.user.userId;
    const recordId = req.params.id;

    const updatedRecord = await Record.update(
      {
        recordDate: recordDate,
        itemDescription: itemDescription,
        itemValue: itemValue,
        itemTypeId: itemTypeId,
      },
      {
        where: {
          userId: userID,
          recordId: recordId,
        },
      }
    );

    if (updatedRecord == 0) {
      return responseWithStatus(
        res,
        `Not found any Record to update with id : ${recordId}`,
        404
      );
    }
    return responseWithStatus(
      res,
      `Successfully updated Record with id : ${recordId}`
    );
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

//Get all inflation data.
const getInflationHandler = expressAsyncHandler(async (req, res) => {
  try {
    let { startyear, endyear } = req.body;

    //API limits the year difference to be 19 years.
    if (endyear - startyear >= 20) {
      startyear = endyear - 19;
    }

    const inflation_final = [];

    const req_body = {
      seriesid: ["CUUR0000SA0"],
      startyear: String(startyear),
      endyear: String(endyear),
      catalog: false,
      calculations: false,
      annualaverage: false,
      aspects: false,
      registrationkey: process.env["INFLATION_DATA_KEY"],
    };

    // Get inflation data from bls api.
    const resp = await fetch(
      "https://api.bls.gov/publicAPI/v1/timeseries/data/",
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(req_body),
      }
    );
    const content = await resp.json();
    const inflation_data = content.Results.series[0].data;

    //santize the data.
    for (let i = 0; i < inflation_data.length; i++) {
      inflation_final.push({
        year: inflation_data[i].year,
        month: inflation_data[i].periodName,
        value: inflation_data[i].value,
        latest: inflation_data[i].latest !== undefined ? true : false,
      });
    }

    return res.json({ inflation_final });
  } catch (error) {
    return responseWithStatus(res, error.message, 400);
  }
});

module.exports = {
  getAllRecordsHandler,
  createRecordHandler,
  deleteRecordHandler,
  updateRecordHandler,
  getInflationHandler,
};
