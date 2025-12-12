// src/routes/exercises.routes.js

const express = require('express');
const router = express.Router();

const {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  partialUpdateExercise,
  deleteExercise
} = require('../controllers/exercises.controller');

router.get('/', getAllExercises);
router.get('/:id', getExerciseById);
router.post('/', createExercise);
router.put('/:id', updateExercise);
router.patch('/:id', partialUpdateExercise);
router.delete('/:id', deleteExercise);

module.exports = router;