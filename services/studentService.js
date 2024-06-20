const serverResponse = require("../constants/serverResponse");
const { commanMessage, studentMessage } = require("../constants/message");
const lodash = require("lodash");
const Student = require("../models/studentModel");
const { formatData } = require("../utils/mongooseUtills");

module.exports.create = async (serviceData) => {
  const response = lodash.cloneDeep(serverResponse);

  try {
    const existStudent = await Student.findOne({
      coaching: serviceData.coaching,
      firstName: serviceData.firstName,
    });

    if (existStudent) {
      response.message = studentMessage.STUDENT_EXIST;
      response.errors.firstName = `${serviceData.firstName} already exists`;
      return response;
    }

    const student = await Student.create({
      firstName: serviceData.firstName,
      description: serviceData.description,
      coaching: serviceData.coaching,
    });

    await student.save();

    response.status = 200;
    response.message = studentMessage.STUDENT_CREATED;
    response.body = formatData(student);
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
    const student = await Student.findByIdAndUpdate(
      {
        _id: serviceData.id,
        coaching: serviceData.coaching,
      },
      updateData,
      {
        new: true,
      }
    );

    if (!student) {
      response.errors.error = studentMessage.STUDENT_NOT_FOUND;
      response.message = studentMessage.STUDENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = studentMessage.STUDENT_UPDATED_SUCCESSFULLY;
    response.body = formatData(student);
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
    const student = await Student.findOne({
      _id: serviceData.id,
      coaching: serviceData.coaching,
    });

    if (!student) {
      response.errors.error = studentMessage.STUDENT_NOT_FOUND;
      response.message = studentMessage.STUDENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = studentMessage.STUDENT_GET_SUCCESSFULLY;
    response.body = formatData(student);
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

    conditions.$or = [{ firstName: searchRegex }, { description: searchRegex }];
  }

  if (status == "All") {
    delete conditions.status;
  } else {
    conditions.status = status == "false" ? false : true;
  }

  try {
    const totalRecords = await Student.countDocuments(conditions);

    const totalPage = Math.ceil(totalRecords / parseInt(limit));

    const student = await Student.find(conditions)
      .populate({
        path: "coaching",
        select: "_id coachingName",
      })
      .populate({
        path: "standard",
        select: "_id standardName",
      })
      .populate({
        path: "subject",
        select: "_id subjectName",
      })
      .populate({
        path: "batch",
        select: "_id batchName",
      })
      .populate({
        path: "session",
        select: "_id sessionName",
      })
      .sort({ _id: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));

    if (!student) {
      response.errors.error = studentMessage.STUDENT_NOT_FOUND;
      response.message = studentMessage.STUDENT_NOT_FOUND;
      return response;
    }

    response.status = 200;
    response.message = studentMessage.STUDENT_GET_SUCCESSFULLY;
    response.body = formatData(student);
    response.page = page;
    response.totalRecords = totalRecords;
    response.totalPage = totalPage;
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
    const student = await Standard.findByIdAndUpdate(
      { _id: serviceData.id, coaching: serviceData.coaching },
      {
        isDeleted: true,
      }
    );

    if (!student) {
      response.message = commanMessage.INVALID_ID;
      response.errors = { id: commanMessage.INVALID_ID };
    }

    response.status = 200;
    response.message = studentMessage.STUDENT_DELETED;
    return response;
  } catch (error) {
    response.message = error.message;
    response.errors = error;
    return response;
  }
};
