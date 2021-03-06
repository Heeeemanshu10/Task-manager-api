const mongoose = require('mongoose')


mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const Tasks = mongoose.model('Tasks',{
      description: {
          type: String,
          trim: true,
          Required: true
      },
      completed: {
          type: Boolean,
          default: false
      }
})

