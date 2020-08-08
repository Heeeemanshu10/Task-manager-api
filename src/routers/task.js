const express = require('express')
const Task = require('../models/task')

const router = express.Router()

router.post('/tasks',async (req,res) => {
    const task = new Task(req.body)
    
    try {
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.get('/tasks',async (req,res) => {
    try {
        const task = await Task.find({})
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.get('/tasks/:id',async (req,res) => {
    const _id = req.params.id
  try {
      const task = await Task.findById(_id)
      if(!task) {
          res.status(404).send()
      }
      res.send(task)
  } catch (error) {
      res.status(404).send()
  }
    
})

router.patch('/tasks/:id',async (req,res) => {
    const update = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        res.status(404).send({ error: 'Does not belong to tasks' })
    }

    const _id = req.params.id
    try {
       const task = await Task.findById(_id)
       update.forEach((update) => task[update] = req.body[update])
       await task.save()
        
        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.delete('/tasks/:id', async (req,res) => {
    const _id = req.params.id 
    try {
        const task = await Task.findByIdAndDelete(_id)

        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router