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

//fetch all teamMember 
userRoutes.get("/all-team-member",protect, AsyncHandler(async(req,res)=>{
  try{
    const user = await User.find({},{teamMember:1,_id:0})

    const allUsers = user.map((user)=> user.teamMember).flat()

   res.status(200).json({message:"All the team members all fetched",teamMember:allUsers})
  }catch (error){
    res.status(500).json({message:"Internal Server Error",error})
  }
}))

userRoutes.delete("/:id",protect,AsyncHandler(async(req,res)=>{
  const {id} = req.params;
  const user = await User.findById(id);
  try{
    if(user){
      await user.deleteOne();
      res.status(200).json({message:"User Deleted Success fully"})
    }else{
      res.json({message:"User not found"});
    }
  }catch(error){
    res.status(400).json({message:error})
  }
}))



module.exports = userRoutes;
