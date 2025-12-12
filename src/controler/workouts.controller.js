// src/controllers/workouts.controller.js

let workouts = [
  { id: 1, name: "Rutina de pecho", userId: 1, duration: 45 },
  { id: 2, name: "Cardio matutino", userId: 2, duration: 30 },
  { id: 3, name: "Rutina de espalda", userId: 3, duration: 45},
  { id: 4, name: "Cardio brazos", userId: 4, duration: 30 },
];

exports.getAllWorkouts = (req, res) => {
  const { userId, limit } = req.query;
  let result = [...workouts];

  if (userId) {
    const id = parseInt(userId);
    result = result.filter(w => w.userId === id);
  }

  if (limit) {
    const numLimit = parseInt(limit);
    if (!isNaN(numLimit)) result = result.slice(0, numLimit);
  }

  res.status(200).json(result);
};

exports.getWorkoutById = (req, res) => {
  const id = parseInt(req.params.id);
  const workout = workouts.find(w => w.id === id);

  if (!workout) {
    return res.status(404).json({ error: "Rutina no encontrada" });
  }

  res.status(200).json(workout);
};

exports.createWorkout = (req, res) => {
  const { name, userId, duration } = req.body;

  if (!name || userId === undefined || duration === undefined) {
    return res.status(400).json({ error: "Nombre, userId y duration son obligatorios" });
  }

  const newWorkout = {
    id: workouts.length > 0 ? Math.max(...workouts.map(w => w.id)) + 1 : 1,
    name,
    userId: parseInt(userId),
    duration: parseInt(duration)
  };

  workouts.push(newWorkout);
  res.status(201).json(newWorkout);
};

exports.updateWorkout = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, userId, duration } = req.body;

  const index = workouts.findIndex(w => w.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Rutina no encontrada" });
  }

  if (!name || userId === undefined || duration === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios para PUT" });
  }

  workouts[index] = {
    id,
    name,
    userId: parseInt(userId),
    duration: parseInt(duration)
  };

  res.status(200).json(workouts[index]);
};

exports.partialUpdateWorkout = (req, res) => {
  const id = parseInt(req.params.id);
  const index = workouts.findIndex(w => w.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Rutina no encontrada" });
  }

  const { name, userId, duration } = req.body;
  if (name !== undefined) workouts[index].name = name;
  if (userId !== undefined) workouts[index].userId = parseInt(userId);
  if (duration !== undefined) workouts[index].duration = parseInt(duration);

  res.status(200).json(workouts[index]);
};

exports.deleteWorkout = (req, res) => {
  const id = parseInt(req.params.id);
  const index = workouts.findIndex(w => w.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Rutina no encontrada" });
  }

  workouts.splice(index, 1);
  res.status(204).send();
};