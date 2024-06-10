const mongoose = require("mongoose");

const coachingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
    },
    images: {
      type: Array,
      default: [],
    },
    logo: {
      type: String,
    },
    mobile: {
      type: String,
      require: true,
    },
    otp: { type: String, trim: true },
    otpExpiredAt: { type: Date, trim: true },
    status: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    jwtToken: { type: String },
    jwtTokenExpireAt: { type: Date, trim: true },
  },
  {
    timestamps: true,
    toObject: {
      transform: (ret, doc, option) => {
        delete doc.__v,
          delete doc.password,
          delete doc.otp,
          delete doc.otpExpiredAt,
          delete doc.isDeleted,
          delete doc.jwtToken,
          delete doc.jwtTokenExpireAt;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("coaching", coachingSchema);
