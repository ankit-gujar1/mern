const express=require('express');
const router=express.Router()
const {getAllStudents, postStudent, getStudent, deleteStudent, updateStudent}=require('../controller/studentController')


//we can use requireAuth middleware either here or we can directly use it in server.js between userRouter and studentRouter
// const requireAuth=require('../middlewares/requireAuth');

// router.use(requireAuth);

router.get('/',getAllStudents)

router.get('/:id',getStudent)

router.post('/',postStudent)

router.patch('/:id',updateStudent)

router.delete('/:id',deleteStudent)

module.exports=router; 