const express = require("express");
const paymentRoutes = express.Router();
const AsyncHandler = require("express-async-handler");
const User = require("../models/User");
const multer = require("multer")
const storage = multer.memoryStorage(); // Store image in memory
const upload = multer({ storage });

paymentRoutes.put('/:id', upload.single('paymentImage'), async (req, res) => {
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
  
      res.status(200).json({ message: 'Congratulation You are registerd to WebSprint 25', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });
  paymentRoutes.get('/:id', async (req, res) => {
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

  module.exports = paymentRoutes