const mongoose = require("mongoose");

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  degree: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  teamMembers: {
    type: [teamMemberSchema],
    validate: {
      validator: function (members) {
        return members.length <= 3; // Maximum of 3 members
      },
      message: "A team can have up to 3 members only",
    },
  },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
