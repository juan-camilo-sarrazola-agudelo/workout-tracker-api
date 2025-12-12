// src/routes/workouts.routes.js

const express = require('express');
const router = express.Router();

const {
  getAllWorkouts,
  getWorkoutById,
  createWorkout,
  updateWorkout,
  partialUpdateWorkout,
  deleteWorkout
} = require('../controllers/workouts.controller');

router.get('/', getAllWorkouts);
router.get('/:id', getWorkoutById);
router.post('/', createWorkout);
router.put('/:id', updateWorkout);
router.patch('/:id', partialUpdateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;