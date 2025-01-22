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
    teamId : {type:String , unique:true},
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
  if (!this.teamId) {
    try {
      // Find the user with the latest teamId
      const lastUser = await mongoose
        .model("User")
        .findOne({})
        .sort({ createdAt: -1 })
        .select("teamId");

      // Extract the last 3 digits from the last teamId
      let lastIdNumber = 99; // Start from 100
      if (lastUser && lastUser.teamId) {
        const match = lastUser.teamId.match(/WS-25(\d{3})/);
        if (match) {
          lastIdNumber = parseInt(match[1], 10);
        }
      }

      // Increment the number
      const nextIdNumber = lastIdNumber + 1;

      // Generate the new teamId
      this.teamId = `WS-25${String(nextIdNumber).padStart(3, "0")}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model("User", userSchema);
