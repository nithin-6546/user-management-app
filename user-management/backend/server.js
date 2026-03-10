import exp from 'express'
import { UserApp } from './APIs/UserApi.js';
import { connect } from 'mongoose'
import {config} from 'dotenv'
import cors from 'cors'
//read env variable
config();

//create HTTp server
const app=exp()

//add cors
app.use(cors({
  origin:["http://localhost:5173"]
}))

//Add body Parser middleware
app.use(exp.json())

//forward res to UserApi if Path starts with/user-api
app.use('/user-api',UserApp)

//connect to database

async function connectDb(params) {
    try{
        await connect(process.env.DB_URL)
        console.log("Connected To database")
        //assign port number
        const port=process.env.PORT
        app.listen(port,()=>console.log('server started'))
    }
    catch(err){
        console.log("Error in dataBase connection");
    }
    
}
connectDb()
//add error handling middleware

app.use((err, req, res, next) => {
  // Mongoose validation error
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.errors,
    });
  }
  // Invalid ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "Invalid ID format",
    });
  }
  // Duplicate key
  if (err.code === 11000) {
    return res.status(409).json({
      message: "Duplicate field value",
    });
  }
  res.status(500).json({
    message: "Internal Server Error",
  });
});