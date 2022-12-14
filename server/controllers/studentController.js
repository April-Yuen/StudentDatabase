// const { AutoEncryptionLoggerLevel } = require('mongodb')
const Student = require('../models/Student')
const moment = require('moment')
const { request } = require('express')


//get-Submit student
exports.submitStudent = async(req, res) =>{
    const infoErrorsObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')
    res.render('students/submit-student', {title: 'Student Info - Submit Student', infoErrorsObj, infoSubmitObj})
}

//post Student
exports.submitStudentOnPost = async(req, res) =>{

    try{
        req.body.user = req.user._id
        const newStudent = new Student({
            name: req.body.name,
            phone_number: req.body.phone,
            email: req.body.email,
            date: req.body.date,
            description: req.body.description,
            user: req.body.user
        
        })
        await newStudent.save();
        console.log(newStudent)

        req.flash('infoSubmit', 'Student has been added.')
        res.redirect('/students/submit-student') 
    }catch(error){
        req.flash('infoErrors', error)
        console.log(error)
        res.redirect('/students/submit-student') 
    }
}

// Get Student to Edit
exports.editStudent = async(req, res) => {
    try{

        let studentId = req.params.id
        limitNumber=1
        let studentById = await Student.findById({_id: studentId}).limit(limitNumber)
        res.render('students/edit-student', {title: "Student Info-Edit", studentById})
    }catch(error){
        res.status(500).send({message: error.message || "Error Occurred"})
    }
}


//Edit Student on Post
exports.editStudentOnPost = async(req,res) => {
    try{
        req.body.user = req.body._id
        let studentId = req.params.id
        let studentById = await Student.findByIdAndUpdate({_id: studentId},{$set: {            
            name: req.body.name,
            phone_number: req.body.phone,
            email: req.body.email,
            date: req.body.date, 
            description: req.body.description,
            user: req.body.user
        }})
            req.session.message = {
                type: 'success',
                message: 'User updated successfully.'
            }
            res.redirect("/dashboard")
            console.log(studentById)
    }catch(error){
        res.status(500).send({message: error.message || "Error Occurred"})
    }
}


//Post/search
exports.searchStudent = async(req, res) => {
    //searchTerm
    try{
        let searchTerm = req.body.searchTerm
        let limitNumber = 1
        let student = await Student.find({$text: {$search: searchTerm, $diacriticSensitive: true}}).limit(limitNumber)
        res.render('search', {title: 'Student Info- Search', student} )
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }

}


//Delete Guest
exports.deleteStudent = async(req,res) =>{
    try{
        let studentId = req.params.id;
        let studentById = await Student.findByIdAndRemove({_id: studentId})
        req.session.message = {
            type: 'success',
            message: 'User deleted.'
        }
        res.redirect('/dashboard')
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}

// [
//     {
//         "name": 'John Doe',
//         "phone_number": "123-456-7890",
//         "email": "john.doe@gmail.com",
//         "date": Date
//     },
//     {
//         "name": 'Mary Kay',
//         "phone_number": "456-232-8920",
//         "email": "mary.kay@gmail.com",
//         "date": Date
//     }
// ]




async function insertDymmyStudentData(){
    try{
        await Student.insertMany([
            {
                "name": 'John Doe',
                "phone_number": "123-456-7890",
                "email": "john.doe@gmail.com",
                "date": "2022-01-07",
                "description": "John is a helper who enjoys working with other students. He explained a math problem to Charlotte."

             },
             {
                 "name": 'Mary Kay',
                 "phone_number": "456-232-8920",
                 "email": "mary.kay@gmail.com",
                 "date": "2022-05-28",
                 "description": "Mary showed her writing to the class inspiring other students."
             }
         ]);
     }catch(error){
         console.log('err' + error)
     }

 }
// insertDymmyStudentData()