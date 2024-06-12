const serverResponse = require("../constants/serverResponse");
const { commanMessage, subjectMessage } = require("../constants/message");
const lodash = require("lodash");
const Subject = require("../models/subjectModel");
const { formatData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existSubject = await Subject.findOne({
      coaching: serviceData.coaching,
      standard: serviceData.standard,
      subjectName: serviceData.subjectName,
    });

    if (existSubject) {
      response.message = subjectMessage.SUBJECT_EXIST;
      response.errors.subjectName = `${serviceData.subjectName} already exists`;
      return response;
    }

    const subject = await Subject.create({
      subjectName: serviceData.subjectName,
      description: serviceData.description,
      coaching: serviceData.coaching,
      standard: serviceData.standard,
    });

    await subject.save();

    response.status = 200;
    response.message = subjectMessage.SUBJECT_CREATED;
    response.body = formatData(subject);
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
    const subject = await Subject.findByIdAndUpdate(
      { _id: serviceData.id, coaching: serviceData.coaching },
      updateData,
      {
        new: true,
      }
    );

    if (!subject) {
      response.errors.error = subjectMessage.SUBJECT_NOT_FOUND;
      response.message = subjectMessage.SUBJECT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = subjectMessage.SUBJECT_UPDATED_SUCCESSFULLY;
    response.body = formatData(subject);
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
    const subject = await Subject.findOne({
      _id: serviceData.id,
      coaching: serviceData._id,
    });

    if (!subject) {
      response.errors.error = subjectMessage.STANDARD_NOT_FOUND;
      response.message = subjectMessage.STANDARD_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = subjectMessage.SUBJECT_GET_SUCCESSFULLY;
    response.body = formatData(subject);
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
    const totalRecords = await Subject.countDocuments(conditions);

    const totalPages = Math.ceil(totalRecords / parseInt(limit));

    const subject = await Subject.find(conditions)
      .populate({
        path: "standard",
        select: "_id standardName",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!subject) {
      response.errors.error = subjectMessage.SUBJECT_NOT_FOUND;
      response.message = subjectMessage.SUBJECT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = subjectMessage.SUBJECT_GET_SUCCESSFULLY;
    response.body = formatData(subject);
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
    const subject = await Subject.findByIdAndUpdate(
      {
        _id: serviceData.id,
        coaching: serviceData._id,
      },
      {
        isDeleted: true,
      }
    );

    if (!subject) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
      return response;
    }

    response.status = 200;
    response.message = subjectMessage.SUBJECT_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
