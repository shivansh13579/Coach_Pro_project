const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    fatherName: {
      type: String,
      require: true,
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
      enum: ["percentage", "amount"],
    },

    mobile: {
      type: String,
    },
    parentMobile: {
      type: String,
    },

    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    pincode: {
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
    session: {
      type: mongoose.Types.ObjectId,
      ref: "session",
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

module.exports = mongoose.model("student", studentSchema);
