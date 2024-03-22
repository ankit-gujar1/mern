const express=require('express');
const router=express.Router()
// const Student=require('../models/studentModel')
const {getAllStudents, postStudent, getStudent, deleteStudent, updateStudent}=require('../controller/studentController')

router.get('/',getAllStudents)

router.get('/:id',getStudent)

router.post('/',postStudent)

router.patch('/:id',updateStudent)

router.delete('/:id',deleteStudent)

module.exports=router; 