const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const taskSchema = new mongoose.Schema({
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
},{
    timestamps: true
})


const Task = mongoose.model('Task',taskSchema)

module.exports = Task
