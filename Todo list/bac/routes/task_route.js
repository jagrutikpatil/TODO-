
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = mongoose.model('Task');

// REST Api to add a new task
router.post('/addTask', (req, res) => {

  const { task } = req.body;

  // Validate the task
  if (!task) {
    return res.status(400).json({ error: 'Invalid task' });
  }

  // Create a new todo object
  const todo = new Task({ task });

  // Save the todo to the database
  todo.save()
    .then((result) => {
      res.status(200).json({ task: result });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});


// REST Api to get all tasks
router.get('/allTasks', async (req, res) => {
  // Get all tasks from the database
  const tasks = await Task.find();

  // Return the tasks to the client
  res.status(200).json({ tasks:tasks});
});


//Restapi to delete task
router.delete('/deleteTask/:id', async (req, res) => {
    // Get the task ID from the request
    const id = req.params.id;
    
  
    // Find the task in the database
    const task = await Task.findById(id);
  
    // If task is not found, return a 404 error
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
  
    // Delete the task from the database
    await Task.deleteOne({ _id: id });
  
    // Return a 200 OK response
    res.status(200).json({ message: 'Task deleted' });
  });
  
module.exports = router;