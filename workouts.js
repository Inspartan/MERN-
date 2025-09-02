const express = require('express')
const {
    createworkout,
    getworkout,
    getworkouts
} = require("../controllers/workoutcontroller")

const router = express.Router()



//GETallworkouts
router.get('/',getworkouts)

//GET a single workout
router.get('/:id',getworkout)

//POST a new workout
router.post('/', createworkout)

//DELETE a workout
router.delete('/:id',(req, res) =>{
    res.json({mssg:'DELETE a workout'})
})

//UPDATE a workout
router.patch('/:id',(req, res) =>{
    res.json({mssg:'UPDATE a workout'})
})

module.exports = router