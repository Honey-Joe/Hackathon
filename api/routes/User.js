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
        teamId:user.teamId,
        college:user.college,
        isadmin: user.isadmin,
        createdAt: user.createdAt,
        contact: user.contact,
        payment:user.payment,
        teamMember: user.teamMember,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      res.json({ message: "Invalid email or password" });
    }
  })
);

userRoutes.post(
  "/",
  AsyncHandler(async (req, res) => {
    try {
      const { name, email, college, password, dept, contact } = req.body;
      const user = await User.findOne({ email });
      if (user) {
        res.status(500).json({ message: "User already Exsist" });
      } else {
        const userSave = await User.create({
          name,
          email,
          college,
          password,
          dept,
          contact,
        });

        const createdUser = await userSave.save();
        res.json({ message: "User created Successfully", createdUser });
      }
    } catch (error) {
      res.send(error);
    }
  })
);

userRoutes.get(
  "/",
  protect,
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

//fetch all teamMember
userRoutes.get(
  "/all-team-member",
  protect,
  AsyncHandler(async (req, res) => {
    try {
      const user = await User.find({}, { teamMember: 1, _id: 0 });

      const allUsers = user.map((user) => user.teamMember).flat();

      res
        .status(200)
        .json({
          message: "All the team members all fetched",
          teamMember: allUsers,
        });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
    }
  })
);

userRoutes.delete(
  "/:id",
  protect,
  AsyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    try {
      if (user) {
        await user.deleteOne();
        res.status(200).json({ message: "User Deleted Success fully" });
      } else {
        res.json({ message: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
);

userRoutes.get(
  "/search",
  AsyncHandler(async (req, res) => {
    try {
      const { query } = req.query;

      // If there's a query, filter users
      if (query) {
        const users = await User.find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { email: { $regex: query, $options: "i" } },
            { college: { $regex: query, $options: "i" } },
          ],
        });
        return res.status(200).json(users);
      }

      // If no query, return all users
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Server error" });
    }
  })
);

module.exports = userRoutes;
