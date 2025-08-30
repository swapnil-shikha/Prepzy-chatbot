import express from 'express';
import dotenv from 'dotenv';
import  mongoose from 'mongoose';
import chatbotRoutes from './routes/chatbot.route.js';





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

//Defining Routes
app.use("/bot/v1/", chatbotRoutes)



app.listen(port, () => {
  console.log(`server is running ${port}`)
})
