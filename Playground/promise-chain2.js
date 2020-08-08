require('../src/db/mongoose')
const Task = require('../src/models/task')
const User = require('../src/models/user')

Task.findByIdAndDelete('5f2927f9c1d5a00b3c7561b8').then((task) => {
    // console.log(task)
    return Task.countDocuments({ completed: false })
}).then((result) => {
    // console.log(result)
}).catch((error) => {
    console.log(error)
})

const deleteTaskAndCount = async (id) => {
const task = await Task.findByIdAndDelete(id)
const count = await Task.countDocuments({ completed: false })
return count
}

deleteTaskAndCount('5f2927f9c1d5a00b3c7561b8').then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})