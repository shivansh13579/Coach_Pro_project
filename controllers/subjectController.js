const subjectService = require("../services/subjectService");

module.exports.create = async (req, res) => {
  try {
    const coaching = req.coaching._id;
    const serviceResponse = await subjectService.create({
      coaching,
      ...req.body,
    });

    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const coaching = req.coaching._id;
    const serviceResponse = await subjectService.update(
      { id, coaching },
      updateData
    );
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.coaching;
    const serviceResponse = await subjectService.findOne({ id, _id });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const coaching = req.coaching._id;
    const serviceResponse = await subjectService.findAll({
      ...req.query,
      coaching,
    });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const coaching = req.coaching._id;
    const serviceResponse = await subjectService.delete({ id, coaching });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
