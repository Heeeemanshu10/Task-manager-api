const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const Task = mongoose.model('Task',{
    description: {
        type: String,
        trim: true,
        Required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        Required: true,
        ref: 'User'
    }
})

module.exports = Task
