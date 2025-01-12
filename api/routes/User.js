const express = require("express");
const userRoutes = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerator");
const protect = require("../Auth/Auth");
const Team = require("../models/Team");

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
  "/member",
  protect,
  AsyncHandler(async (req, res) => {
    const { userId, teamMembers } = req.body;

    if (!userId || !Array.isArray(teamMembers)) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let team = await Team.findOne({ user: userId });

      if (team) {
        if (team.teamMembers.length + teamMembers.length > 3) {
          return res
            .status(400)
            .json({
              message: "Adding these members will exceed the limit of 3",
            });
        }

        team.teamMembers.push(...teamMembers);
      } else {
        team = new Team({ user: userId, teamMembers });
      }

      await team.save();

      res
        .status(200)
        .json({ message: "Team members updated successfully", team });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

userRoutes.get(
  "/member/:userId",
  protect,
  AsyncHandler(async (req, res) => {
    const { userId } = req.params;

    try {
      const team = await Team.findOne({ user: userId }).populate(
        "user",
        "name email"
      );
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      res.status(200).json(team);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  })
);

module.exports = userRoutes;
