const Workout = require('../models/WorkoutModel')

// get all workouts
const getworkouts = async (req, res) => {
    const workouts = await workout.find({}).sort({createAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
const getworkout = async (req, res) =>{
    const { id } = req.params
    const workout = await workout.findById(id)

    if(!workout){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}


//create a workout
const createworkout = async (req, res) => {
     const {title, load, reps} = req.body
     
     //add doc to db
    try 
    {
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a workout


//update a workout


module.exports = {
    getworkouts,
    getworkout,
    createworkout
}