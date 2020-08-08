const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/tasks', auth ,async (req,res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    
    try {
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.get('/tasks', auth ,async (req,res) => {
    try {
        const match = {}

        if(req.query.completed) {
            match.completed = req.query.completed === 'true'
        }
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        res.send(req.user.tasks)
    } catch (error) {
        res.status(404).send()
    }
})

router.get('/tasks/:id', auth ,async (req,res) => {
    const _id = req.params.id
  try {
    //   const task = await Task.findById(_id)
     const task = await Task.findOne({ _id, owner: req.user._id })

      if(!task) {
          res.status(404).send()
      }
      res.send(task)
  } catch (error) {
      res.status(404).send()
  }
    
})

router.patch('/tasks/:id', auth ,async (req,res) => {
    const update = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = update.every((update) => allowedUpdates.includes(update))
    if(!isValidOperation) {
        res.status(404).send({ error: 'Does not belong to tasks' })
    }

    const _id = req.params.id
    try {
       const task = await Task.findOne({ _id: _id , owner: req.user._id }) 
              
        if(!task) {
            res.status(404).send()
        }

        update.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

router.delete('/tasks/:id', auth , async (req,res) => {
    const _id = req.params.id 
    try {
        // const task = await Task.findByIdAndDelete(_id)
        const task = await Task.findOneAndDelete({ _id: _id , owner: req.user._id})

        if(!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (error) {
        res.status(404).send()
    }
})

module.exports = router