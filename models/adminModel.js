const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please add a name"],
      lowercase: true,
    },
    lastName: {
      type: String,
      required: [true, "Please add a name"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    profileImg: {},
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 8 character"],
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
        delete doc.__v;
        delete doc.password;
        delete doc.otp;
        delete doc.otpExpiredAt;
        delete doc.jwtToken;
        delete doc.jwtTokenExpireAt;
        return doc;
      },
    },
  }
);

module.exports = mongoose.model("admin", adminSchema);
