const serverResponse = require("../constants/serverResponse");
const { commanMessage, standardMessage } = require("../constants/message");
const lodash = require("lodash");
const Standard = require("../models/standardModel");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existStandard = await Standard.findOne({
      coaching: serviceData.coaching,
      standardName: serviceData.standardName,
    });

    if (existStandard) {
      response.message = standardMessage.STANDARD_EXIST;
      response.errors.standardName = `${serviceData.standardName} already exists`;
      return response;
    }

    const standard = await Standard.create({
      standardName: serviceData.standardName,
      description: serviceData.description,
      coaching: serviceData.coaching,
    });

    await standard.save();

    const isModified = standard.toObject();
    response.status = 200;
    response.message = standardMessage.STANDARD_CREATED;
    response.body = isModified;
    return response;
  } catch (error) {
    response.message = commanMessage.SOMETHING_WENT_WRONG;
    response.errors = error;
    return response;
  }
};

module.exports.update = async (serviceData, updateData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const standard = await Standard.findByIdAndUpdate(
      {
        _id: serviceData.id,
        coaching: serviceData.coaching,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!standard) {
      response.errors.error = standardMessage.STANDARD_NOT_FOUND;
      response.message = standardMessage.STANDARD_NOT_FOUND;
      return response;
    }

    const isModified = standard.toObject();

    response.status = 200;
    response.message = standardMessage.STANDARD_UPDATED_SUCCESSFULLY;
    response.body = isModified;
    return response;
  } catch (error) {
    response.errors = error;
    response.message = error.message;
    return response;
  }
};

module.exports.findOne = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);
  try {
    const standard = await Standard.findOne({
      _id: serviceData.id,
      coaching: serviceData.coaching,
    });

    if (!standard) {
      response.errors.error = standardMessage.STANDARD_NOT_FOUND;
      response.message = standardMessage.STANDARD_NOT_FOUND;
      return response;
    }

    const isModified = standard.toObject();
    response.status = 200;
    response.message = standardMessage.STANDARD_GET_SUCCESSFULLY;
    response.body = isModified;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.findAll = async ({
  limit = 10,
  page = 1,
  status = true,
  searchQuery,
  coaching,
}) => {
  const response = lodash.cloneDeep(serverResponse);

  let conditions = {
    isDeleted: false,
    coaching,
  };

  if (searchQuery) {
    const searchRegex = { $regex: searchQuery, $options: "i" };

    conditions.$or = [
      { standardName: searchRegex },
      { description: searchRegex },
    ];
  }

  if (status == "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await Standard.countDocuments(conditions);

    const totalPage = Math.ceil(totalRecords / parseInt(limit));

    const standard = await Standard.find(conditions)
      .populate({
        path: "coaching",
        select: "_id coachingName",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!standard) {
      response.errors.error = standardMessage.STANDARD_NOT_FOUND;
      response.message = standardMessage.STANDARD_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = standardMessage.STANDARD_GET_SUCCESSFULLY;
    response.body = { standard, page, totalRecords, totalPage };
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};

module.exports.delete = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const standard = await Standard.findByIdAndUpdate(
      { _id: serviceData.id, coaching: serviceData.coaching },
      {
        isDeleted: true,
      }
    );

    if (!standard) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
    }

    response.status = 200;
    response.message = standardMessage.STANDARD_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
