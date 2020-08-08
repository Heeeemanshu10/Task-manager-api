const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { cornsilk } = require('color-name')
const router = express.Router()

router.post('/users',async (req,res) => {
    const user = new User(req.body)
     try {
        await user.save()
        const token = await user.generateAuthToken() 
        res.status(201).send({ user, token })
     } catch (error) {
         res.status(404).send()
     }
    
    })

router.post('/users/login', async (req,res) => {
    try{
    const user = await User.findByCredentials(req.body.email , req.body.password)
    const token = await user.generateAuthToken()
     res.send({ user , token })
    
    } catch(e) {
        res.status(404).send()
    }
})    
    
router.post('/users/logout', auth , async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
       await req.user.save()
       res.send()

    } catch (error) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth , async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (error) {
        res.send(500).send()
    }
})

    router.get('/users/me',auth ,async (req,res) => {
        res.send(req.user) 
    })
    
    router.get('/users/:id',async (req,res) => {
       const _id = req.params.id
       try {
       const user = await User.findById(_id)
       if(!user) {
           res.status(404).send();
       }
       res.send(user)
       } catch(error) {
          res.status(404).send(error)
       }
    })
    
    router.patch('/users/:id', async(req,res) => {
       const updates = Object.keys(req.body)
       const allowedUpdates = ['name','email','password','age']
       const isValidOperation = updates.every((updates) =>  allowedUpdates.includes(updates))  
       if(!isValidOperation) {
           res.status(404).send({ error: "Does not belong to the category" })
       } 
       
        const _id = req.params.id
        try {
               const user = await User.findById(_id)
               updates.forEach((update) => user[update] = req.body[update])
               await user.save()

            // const updatedUser = await User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
            if(!updatedUser) {
                res.status(404).send()
            }
            res.send(updatedUser)
        } catch (error) {
            res.status(404).send()
        }
    })     
    
    router.delete('/users/:id',async (req,res) => {
        const _id = req.params.id
        try {
            const user = await User.findByIdAndDelete(_id)
    
            if(!user){
                res.status(404).send()
            }
            res.send(user)
        } catch (error) {
            res.status(404).send()
        }
    })
    
    module.exports = router