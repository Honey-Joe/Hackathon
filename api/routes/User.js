const express = require("express");
const userRoutes = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const generateToken = require("../tokenGenerator");
const protect = require("../Auth/Auth");
const multer = require("multer")
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });

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

userRoutes.get(
  "/member",
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

userRoutes.get(
  "/member/:id",
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

userRoutes.put('/member/:id/payment', upload.single('paymentImage'), async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the payment field with the image
    user.payment = {
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    // Save the updated user
    await user.save();

    res.status(200).json({ message: 'Congratulation You are registerd to hackathon 24', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
userRoutes.get('/member/:id/payment', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user || !user.payment || !user.payment.image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Send the image as a response
    res.set('Content-Type', user.payment.image.contentType);
    res.send(user.payment.image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = userRoutes;
