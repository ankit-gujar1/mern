require('dotenv').config();

const express=require('express');
const app=express();

const cors=require('cors');
const mongoose=require('mongoose');

const studentRouter = require('./routes/studentRoutes');
const userRouter=require('./routes/userRoutes')

app.use(cors());
app.use(express.json());

app.use(studentRouter); //CRUD Middleware for student
app.use(userRouter); //CRUD Middleware for user

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("backend is up and running");
    })
})
.catch((e)=>{
    console.log(e);
})
