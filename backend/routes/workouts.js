const express = require('express')
const {
    createworkout,
    getworkout,
    getworkouts,
    deleteworkout,
    updateWorkout
} = require("../controllers/workoutcontroller")

const router = express.Router()



//GETallworkouts
router.get('/',getworkouts)

//GET a single workout
router.get('/:id',getworkout)

//POST a new workout
router.post('/', createworkout)

//DELETE a workout
router.delete('/:id',deleteworkout)

//UPDATE a workout
router.patch('/:id',updateWorkout)

module.exports = router