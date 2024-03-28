const jwt=require('jsonwebtoken');
const User=require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //authorization is the property which is present in headers of req and we can access it like we access req body by doing req.headers
    const { authorization } = req.headers;

    if(!authorization) return res.status(401).json({error:"Authorization not found"})

    //authorization is a string which contain token something like follows
    //authorization="Bearer sdfueegwfjadw.agvsdhcuerihjs.dqwhdvbhQWFJIER"
    //so we only need token part of authorization string so we slice it
    const token=authorization.split(' ')[1];

    //now we try to verify token which we got above with the secret in .env
    //also if verification is successfull we will try to exract _id from it
    //then using _id we will check if database contain user with that _id or not
    try {
        const {_id}=jwt.verify(token,process.env.SECRET);
        //associating user with the req, we use this in studentController to get user_id for showing the data that is added by that particular user
        req.user=await User.findOne({_id}).select('_id'); 
        next();
    } catch (error) {
        console.log(error);
        res.status(400).json({error:"Request is not authorized"});
    }

}

module.exports=requireAuth;