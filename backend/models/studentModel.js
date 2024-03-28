const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    sName:{
        type:String,
        required:true
    },
    sID:{
        type:Number,
        required:true
    },
    sAge:{
        type:Number,
        required:true
    },
    //to show data added by that particular user
    user_id:{
        type:String,
        required:true
    }
},{timestamps:true});

// const studentSchema=new Schema()

module.exports=mongoose.model('Student',Schema);