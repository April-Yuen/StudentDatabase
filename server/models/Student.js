const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: "This field is required."
    },
    phone_number: {
        type: String, 
        required: "This field is required."
    },
    email: {
        type: String,
        required:"This field is required."
    },
    date: {
        type: Date, 
        default: Date.now
    },
    description: {
        type: String,
        required: "This field is required.",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
})

// studentSchema.index({name:'text', phone_number:'text'})

module.exports = mongoose.model('Student', studentSchema);