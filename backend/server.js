require('dotenv').config();

const express=require('express');
const app=express();

const cors=require('cors');
const mongoose=require('mongoose');

const empRouter = require('./routes/studentRoutes');

app.use(cors());
app.use(express.json());
app.use(empRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("connected to db and port",process.env.PORT)
    })
})
.catch((e)=>{
    console.log(e);
})
