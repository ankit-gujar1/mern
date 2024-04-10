require('dotenv').config();

const express=require('express');
const app=express();

const cors=require('cors');
const mongoose=require('mongoose');

const studentRouter = require('./routes/studentRoutes');
const userRouter=require('./routes/userRoutes');
const requireAuth=require('./middlewares/requireAuth');


app.use(cors());
app.use(express.json()); //if we don't use router and directly use app.get(=) then this line will give error

/*

//we can use requireAuth middleware in studentRouter.js also reffer studentRouter.js commented code. If we want to use it in studentRouter.js then follow below commented stuff

//userRouter should be first in sequence, to access stuff in studentRouter we need authorization and authorization is done by login/signup
//if we keep studentRouter before userRouter then due to authorization we will not be able to do login/signup

app.use(userRouter); //CRUD Middleware for user
app.use(studentRouter); //CRUD Middleware for student

*/

app.use(userRouter);
app.use(requireAuth);
app.use(studentRouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("backend is up and running");
    })
})
.catch((e)=>{
    console.log(e);
})
