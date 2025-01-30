const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const bodyParser = require("body-parser");
const teamRoutes = require("./routes/Team");
const cors = require("cors")
const paymentRoutes = require("./routes/Payment");
const app = express();
dotenv.config();
app.use(cors({
    origin: 'https://hackathon-25.vercel.app/'
  }));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://hackathon-25.vercel.app/'); // Change '*' to a specific domain if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use(bodyParser.json())
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("hi")
})
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected"));
app.use("/api/users", userRoutes);
app.use("/api/users/member", teamRoutes);
app.use("/api/users/payment", paymentRoutes);

const PORT = process.env.PORT;
app.listen(PORT||9000,()=>{
    console.log("Server Running on ",PORT);
})