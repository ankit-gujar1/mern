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
    }
},{timestamps:true});

// const studentSchema=new Schema()

module.exports=mongoose.model('Student',Schema);