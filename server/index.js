import express from "express";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import route from "./routes/userRouts.js";
import { create } from "./controller/userController.js";

const app= express();
 app.use(bodyParser.json());
 app.use(cors());
 dotenv.config();


 const port= process.env.PORT || 7000;
 const URL=  process.env.MONGOURL;

 mongoose.connect(URL).then(()=>{
    console.log("connection succefully");
    app.listen(port, ()=>{
        console.log(`server is running on port: ${port}`)
    })
 }).catch(error=>console.log(error));
 

 app.use("/api",route);