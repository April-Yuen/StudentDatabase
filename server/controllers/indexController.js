const { AutoEncryptionLoggerLevel } = require('mongodb')
const Student = require('../models/Student')


exports.getLogin = async(req, res) => {
    try {
        res.render('login', {title: 'Student Info- Login'} );
    }catch(error){
        res.status(500).send({message: error.message || "Error Occured"})
    }
}
