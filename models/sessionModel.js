const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema(
  {
    sessionName: {
      type: String,
      require: true,
    },
    sessionStart: {
      type: String,
      require: true,
    },
    sessionEnd: {
      type: String,
    },
    aboutSession: {
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
    batch: {
      type: mongoose.Types.ObjectId,
      ref: "batch",
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

module.exports = mongoose.model("session", sessionSchema);
