const standardService = require("../services/standardService");

module.exports.create = async (req, res) => {
  try {
    const coaching = req.coaching._id;
    const serviceResponse = await standardService.create({
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
    const serviceResponse = await standardService.update(
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
    const coaching = req.coaching._id;
    const serviceResponse = await standardService.findOne({ id, coaching });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

module.exports.findAll = async (req, res) => {
  try {
    const coaching = req.coaching._id;
    const serviceResponse = await standardService.findAll({
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
    const serviceResponse = await standardService.delete({ id, coaching });
    res.status(serviceResponse.status).send(serviceResponse);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
