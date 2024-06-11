const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
  {
    subjectName: {
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

module.exports = mongoose.model("subject", subjectSchema);
