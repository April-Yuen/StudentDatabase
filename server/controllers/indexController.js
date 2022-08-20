// const { AutoEncryptionLoggerLevel } = require('mongodb')
const Student = require('../models/Student')



exports.getLogin = async(req, res) => {
    try {
        res.render('login', {title: 'Student Info- Login', layout: './layouts/login'} );
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}

exports.getDatabase = async(req, res) => {
    try {
        const students = await Student.find({user: req.user.id}).lean()
        res.render('dashboard', {title: 'Student Info- Home', students, name: req.user.firstName} );
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}
