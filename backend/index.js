import express from 'express';
import dotenv from 'dotenv';
import  mongoose from 'mongoose';
const app = express()
dotenv.config()
const port = process.env.PORT || 3000
//Database connection code
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connected to MongoDB")
}).catch((error)=>{
    console.log("Error connecting to MongoDB:",error)
})


app.listen(port, () => {
  console.log(`server is running ${port}`)
})
