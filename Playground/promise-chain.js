require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

User.findByIdAndUpdate('5f294526571a782548e16d05', { age: 1 }).then((user) => {
  
    return User.countDocuments({ age: 1 })
}).then((result) => {
    console.log(result)
}).catch((error) => {
    console.log(error)
})

const updateAgeAndCount = async (id,age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await  User.countDocuments({ age })
    return count
}

updateAgeAndCount('5f294526571a782548e16d05', 2).then((count) => {
    console.log(count)
}).catch((error) => {
    console.log(error)
})