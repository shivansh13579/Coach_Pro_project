const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    batchName: {
      type: String,
      require: true,
    },
    studentLimit: {
      type: String,
      require: true,
    },
    batchStartDate: {
      type: String,
      require: true,
    },
    batchEndingDate: {
      type: String,
      require: true,
    },
    batchStartTime: {
      type: String,
      require: true,
    },
    batchEndingTime: {
      type: String,
      require: true,
    },
    batchFee: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    coaching: {
      type: mongoose.Types.ObjectId,
      ref: "coaching",
    },
    standard: {
      type: mongoose.Types.ObjectId,
      ref: "standard",
    },
    subject: {
      type: mongoose.Types.ObjectId,
      ref: "subject",
    },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toObject: {
      transform: (ret, doc, option) => {
        delete doc.__v, delete doc.isDeleted;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("batch", batchSchema);
