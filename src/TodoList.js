// src/TodoList.js

import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [timeValue, setTimeValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTimeValue(e.target.value);
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== '' && timeValue.trim() !== '') {
      const newTask = { text: inputValue, time: timeValue, completed: false };
      setTasks([...tasks, newTask]);
      setInputValue('');
      setTimeValue('');
      scheduleAlarm(newTask);
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.map((task, taskIndex) => 
      taskIndex === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks.filter(task => !task.completed));
  };

  const scheduleAlarm = (task) => {
    const alarmTime = new Date(task.time).getTime();
    const currentTime = new Date().getTime();
    const delay = alarmTime - currentTime;

    if (delay > 0) {
      setTimeout(() => {
        alert(`Task reminder: ${task.text}`);
      }, delay);
    }
  };

  return (
    <div className="main">
      <h1 className="main-heading">Enter To-Do List Item</h1>
      <div className="todo-container">
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a task"
            className="task-input"
          />
          <input
            type="datetime-local"
            value={timeValue}
            onChange={handleTimeChange}
            className="time-input"
          />
          <button onClick={handleAddTask} className="add-button">+</button>
        </div>
      </div>
      <div className="list-container">
        <div className="list-section">
          <h1>To-Do List</h1>
          <ul className="task-list">
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(index)}
                  className="task-checkbox"
                />
                <span>{task.text}</span> <span className="task-time">({task.time})</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
