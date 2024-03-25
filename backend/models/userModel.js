const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const validator=require('validator'); //used to do email, password and different type of validations

const userSchema=mongoose.Schema({
    uName:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    }
},{timestamps:true})

//signup is user defined function like "find(),findOne(),delete(),create()" which can be used in controller as User.signup(parameters) just like we use User.create(parameters)

userSchema.statics.signup =async function(uName,password){

    //validations
    if(!uName || !password) throw Error("Username and password are required"); //we catch this error in controller
    if(!validator.isStrongPassword(password)) throw Error("Password must contain..."); //we catch this error in controller
    const u=await this.findOne({uName});
    if(u) throw Error("Username already exist"); //we catch this error in controller

    //password hashing
    const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);

    //creating user
    const user=await this.create({uName,password:hash});

    return user;
}

userSchema.statics.login=async function(uName,password){
    
    //validations
    if(!uName || !password) throw Error("Username and password are required");

    const u=await this.findOne({uName});
    // console.log(!u); 
    
    //if user is found then u contain user's info but if user don't exist then u will contain "null" and !null is true
    if(!u) throw Error("Incorrect username");

    const match=await bcrypt.compare(password,u.password);

    if(!match) throw Error("Incorrect password");

    return u;
}

module.exports=mongoose.model('User',userSchema);