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
        contact: user.contact,
        teamMember: user.teamMember,
        token: generateToken(user.id),
      });
    } else {
      res.status(401);
      res.json({message:"Invalid email or password"})
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







module.exports = userRoutes;
