const express = require("express");
const userRoutes = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerator");
const protect = require("../Auth/Auth");

userRoutes.post(
  "/login",
  AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchpassword(password))) {
      res.json({
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        isadmin: user.isadmin,
        createdAt: user.createdAt,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  })
);

userRoutes.post(
  "/",
  AsyncHandler(async (req, res) => {
    const { name, email, password, college, dept, contact } = req.body;
    const userexist = await User.findOne({ email });
    if (userexist) {
      res.status(400);
      throw new Error("User Already Exist");
    } else {
      const user = await User.create({
        name,
        email,
        password,
        college,
        dept,
        contact,
      });
      if (user) {
        res.status(201).json({
          data: user,
          message: "Registered",
        });
      } else {
        res.status(400);
        throw new Error("User data Invalid");
      }
    }
  })
);

userRoutes.post(
  "/member/:id/team",
  AsyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { teamMembers } = req.body; // Expecting an array of team members
  
    if (!Array.isArray(teamMembers)) {
      return res.status(400).json({ message: "Invalid data format. 'teamMembers' should be an array." });
    }
  
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Ensure no more than 3 team members
      if (user.teamMember.length + teamMembers.length > 3) {
        return res.status(400).json({
          message: `Cannot add more than 3 team members. Current: ${user.teamMember.length}, Adding: ${teamMembers.length}`,
        });
      }
  
      user.teamMember.push(...teamMembers);
      await user.save();
  
      res.status(200).json({ message: "Team members added successfully", user });
    } catch (error) {
      console.error("Error adding team members:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  })
);

userRoutes.get(
  "/member",
  AsyncHandler(async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  })
);

module.exports = userRoutes;

userRoutes.get(
  "/member/:id",
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

module.exports = userRoutes;
