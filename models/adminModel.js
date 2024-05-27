const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,

    // otp: { type: String, trim: true },
    // otpExpiredAt: { type: Date, trim: true },
    // status: { type: Boolean, default: true },
    // isDeleted: { type: Boolean, default: false },
    // jwtToken: { type: String },
    // jwtTokenExpireAt: { type: Date, trim: true },
  },
  {
    timestamps: true,
    // toObject: {
    //   transform: (doc, ret, option) => {
    //     delete ret.__v;
    //     delete ret.password;
    //     delete ret.otp;
    //     delete ret.otpExpiredAt;
    //     delete ret.jwtToken;
    //     delete ret.jwtTokenExpireAt;
    //   },
    // },
  }
);

// adminSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10);
// });

module.exports = mongoose.model("admin", adminSchema);
