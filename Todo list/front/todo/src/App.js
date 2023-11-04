import React, { useState, Fragment, useEffect } from 'react';
import './App.css'
import axios from 'axios'


const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (task.trim() !== '') {
      const body = {
        task
      };

      // Adding task to backend
      await axios.post('http://localhost:4400/addTask', body);

      // Update the tasks state
      setTasks([...tasks, body]);
      setTask(''); 
    }
  };

  const deleteTask = async (taskId) => {
    // Delete the task from the backend
    console.log(taskId)
    await axios.delete(`http://localhost:4400/deleteTask/${taskId}`);

  };
  useEffect(() => {
    const getTasks = async () => {
      // Get the tasks from the backend
      const tasksFromBackend = await axios.get('http://localhost:4400/allTasks');
      // Update tasks state
      setTasks(tasksFromBackend.data.tasks);
    };
    getTasks();
  },);

  return (
    <>
      
        {/* <div className='container'> */}
        <div className='container'>
        <h1>TO DO LIST APP</h1>
        
       
        <form onSubmit={onSubmitForm}>
          {/* Label for app  */}
          <label>Enter Task:-</label>
          {/* input field  */}
          <input type='text' value={task} onChange={e => setTask(e.target.value)} placeholder='Add your Task Here...' className='input' />
          {/* button to add task  */}
          <input type='submit' value="Add Task" className='sub' />
          <ul>
            {tasks.map(taskItem => (
              <div className='list-box' key={taskItem._id}>
                <div className='list'>
                  <li>{taskItem.task}</li>
                   {/* button to delete the task  */}
                <button onClick={() => deleteTask(taskItem._id)} className='list-btn'>X</button>
                </div>
             

              </div>

            )
            )
            }
          </ul>
        </form>
      </div>
    </>
  );
};

export default Tasks;