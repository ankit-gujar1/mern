const User=require('../models/userModel');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//function to create jwt token where payload is _id and secret is in .env and header is jwt
const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}

const loginUser=async (req,res)=>{
    const {uName,password}=req.body;

    try{
        const u=await User.login(uName,password);

        const token=createToken(u._id);

        res.status(200).json({token,uName});
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
}

const signupUser=async (req,res)=>{
    const {uName,password}=req.body;
    try{

        //we can use static method signup or can do password hashing and validations here also

        // const u = await User.findOne({uName});
        // if (u) throw Error("Username already exist");

        // const salt = await bcrypt.genSalt(10);
        // const hash = await bcrypt.hash(password, salt);

        // const user = await User.create({ uName, password: hash });

        const u=await User.signup(uName,password); //calling static method created in userModel

        const token=createToken(u._id); //creating token as soon as user get signup/register

        res.status(200).json({token,uName});
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}

module.exports={loginUser,signupUser}