const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/User");
const bodyParser = require("body-parser");
const teamRoutes = require("./routes/Team");
const paymentRoutes = require("./routes/Payment");
const app = express();
dotenv.config();
const cors = require('cors');
app.use(cors()); // Allow all origins (for development)  
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