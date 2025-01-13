const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  degree: { type: String, required: true },
});
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    college: { type: String, required: true },
    dept: { type: String, required: true },
    contact: { type: String, required: true },
    teamMember:[teamMemberSchema],
    payment:{image:{
      data:Buffer,
      contentType:String
    }}
  },
  { timestamps: true }
);

userSchema.methods.matchpassword = async function (enterpassword) {
  return await bcrypt.compare(enterpassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
