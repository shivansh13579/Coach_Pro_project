const serverResponse = require("../constants/serverResponse");
const {
  commanMessage,
  subjectMessage,
  sessionMessage,
} = require("../constants/message");
const lodash = require("lodash");
const Session = require("../models/sessionModel");
const { formatData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existSession = await Session.findOne({
      sessionName: serviceData.sessionName,
      coaching: serviceData.coaching,
      standard: serviceData.standard,
      subject: serviceData.subject,
    });

    if (existSession) {
      response.message = sessionMessage.SESSION_EXIST;
      response.errors.sessionName = `${serviceData.sessionName} already exists`;
      return response;
    }

    const session = await Session.create(serviceData);

    await session.save();

    response.status = 200;
    response.message = sessionMessage.SESSION_CREATED;
    response.body = formatData(session);
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
    const session = await Session.findByIdAndUpdate(
      { _id: serviceData.id, coaching: serviceData.coaching },
      updateData,
      {
        new: true,
      }
    );

    if (!session) {
      response.errors.error = sessionMessage.SUBJECT_NOT_FOUND;
      response.message = sessionMessage.SESSION_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = sessionMessage.SESSION_UPDATED_SUCCESSFULLY;
    response.body = formatData(session);
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
    const session = await Session.findOne({
      _id: serviceData.id,
      coaching: serviceData._id,
    });

    if (!session) {
      response.errors.error = sessionMessage.SESSION_NOT_FOUND;
      response.message = sessionMessage.SESSION_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = sessionMessage.SESSION_GET_SUCCESSFULLY;
    response.body = formatData(session);
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
      { subjectName: searchRegex },
      { description: searchRegex },
    ];
  }

  if (status == "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await Session.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const session = await Session.find(conditions)
      .populate({
        path: "standard",
        select: "_id standardName",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!session) {
      response.errors.error = sessionMessage.SESSION_NOT_FOUND;
      response.message = sessionMessage.SESSION_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = sessionMessage.SESSION_GET_SUCCESSFULLY;
    response.body = formatData(session);
    response.page = page;
    response.totalPages = totalPages;
    response.totalRecords = totalRecords;

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
    const session = await Session.findByIdAndUpdate(
      {
        _id: serviceData.id,
        coaching: serviceData._id,
      },
      {
        isDeleted: true,
      }
    );

    if (!session) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = sessionMessage.SESSION_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
