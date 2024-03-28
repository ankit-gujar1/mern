const { default: mongoose } = require('mongoose');
const Student=require('../models/studentModel')

const getAllStudents=async (req,res)=>{
    const user_id=req.user._id; //reffer to requireAuth middleware
    try {
        const s=await Student.find({user_id});
        res.status(200).json(s);
    } catch (e) {
        res.status(400).json({error:e.message})
    }
}

const postStudent=async (req,res)=>{
    const user_id=req.user._id; //reffer to requireAuth middleware
    const {sName,sID,sAge}=req.body;
    try {
        const s=await Student.create({sName,sID,sAge,user_id});
        res.status(200).json(s);
    } catch (e) {
        // console.log(e);
        res.status(400).json({error:e.message});
    }
}

const getStudent=async (req,res)=>{
    const {id}=req.params;

    //optional - based on usecase
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"Student not found"});

    const s=await Student.findById(id);

    if(!s) return res.status(404).json({error:"Student not found"});
    res.status(200).json(s); 
}

const deleteStudent=async (req,res)=>{
    const {id}=req.params;
    
    //optional - based on usecase
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"Student not found"});

    const s=await Student.findOneAndDelete({_id:id});

    if(!s) return res.status(404).json({error:"Student not found"});
    res.status(200).json(s);
}

const updateStudent=async (req,res)=>{
    const {id}=req.params;

    //optional - based on usecase
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error:"Student not found"});

    const s=await Student.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if(!s) return res.status(400).json({error:"Student not found"});
    res.status(200).json(s);
}

module.exports={
    getAllStudents,
    postStudent,
    getStudent,
    deleteStudent,
    updateStudent
}