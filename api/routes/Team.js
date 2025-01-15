const express = require("express");
const AsyncHandler = require("express-async-handler");
const teamRoutes = express.Router();
const protect = require("../Auth/Auth");
const User = require("../models/User");


//to post a team member
teamRoutes.post(
  "/:id/team",
  protect,
  AsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { name, email, contact, degree } = req.body; // Extract individual fields

    // Validate that all required fields are present
    if (!name || !email || !contact || !degree) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide name, email, contact, and degree.",
      });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Ensure no more than 3 team members
      if (user.teamMember.length >= 3) {
        return res.status(400).json({
          message: `Cannot add more than 3 team members. Current: ${user.teamMember.length}`,
        });
      }

      // Create a team member object from the fields
      const newTeamMember = { name, email, contact, degree };

      // Add the new team member to the user's team
      user.teamMember.push(newTeamMember);
      await user.save();

      res.status(200).json({
        message: "Team member added successfully",
        user,
      });
    } catch (error) {
      console.error("Error adding team member:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  })
);

//fetch teammembers of a user route
teamRoutes.get(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("teamMember");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  })
);

teamRoutes.delete("/:userId/team/:memberId",protect,AsyncHandler(async(req,res)=>{
    const { userId, memberId } = req.params;

  try {
    // Check if the authenticated user matches the target user
    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Not authorized to delete team members for this user." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find and remove the team member
    const teamMemberIndex = user.teamMember.findIndex(
      (member) => member._id.toString() === memberId
    );

    if (teamMemberIndex === -1) {
      return res.status(404).json({ message: "Team member not found" });
    }

    user.teamMember.splice(teamMemberIndex, 1); // Remove the team member
    await user.save();

    res.status(200).json({
      message: "Team member deleted successfully",
      user,
    });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}))

module.exports = teamRoutes;
