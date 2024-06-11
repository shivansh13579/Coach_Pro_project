const mongoose = require("mongoose");

const standardSchema = new mongoose.Schema(
  {
    standardName: {
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

module.exports = mongoose.model("standard", standardSchema);
