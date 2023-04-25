import "./Tasks.css";
import Nav from "../Nav/Nav";

import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  MdModeEdit,
  MdDone,
  MdDelete,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

const API_URL = process.env.REACT_APP_API_URL;
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newTaskValue, setNewTaskValue] = useState("");
  const [editingTaskValue, setEditingTaskValue] = useState("");

  const [editing, setEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Fetch tasks from the server and update the state
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setTasks(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (description) => {
    try {
      const response = await axios.post(
        `${API_URL}/tasks`,
        { description },
        config
      );
      setTasks([...tasks, response.data]);
      setNewTaskValue("");
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updates) => {
    console.log(id, updates);
    setTasks(
      tasks.map((task) => (task._id === id ? { ...task, ...updates } : task))
    );

    try {
      const response = await axios.put(
        `${API_URL}/tasks/${id}`,
        updates,
        config
      );
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditing(false);
      setEditingTaskId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      setTasks(tasks.filter((task) => task._id !== id));
      await axios.delete(`${API_URL}/tasks/${id}`, config);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskValue);
  };

  const handleEdit = (task) => {
    if (!editing) {
      setEditing(true);
      setEditingTaskId(task._id);
      setEditingTaskValue(task.description);
    } else {
      updateTask(task._id, {
        description: editingTaskValue,
        completed: task.completed,
      });
    }
  };

  return (
    <div className="tasks-container">
      <Nav />
      <h1>Tasks</h1>
      <form className="tasks-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTaskValue}
          onChange={(e) => setNewTaskValue(e.target.value)}
          placeholder="Enter a task"
          required
        />
        <button type="submit">{"Add"}</button>
      </form>
      {isLoading && <p>Loading...</p>}
      <ul className="tasks-list">
        {tasks.map((task) => (
          <li key={task._id}>
            {!task.completed ? (
              <MdCheckBoxOutlineBlank
                size={"1.5em"}
                className="icon-button"
                onClick={() =>
                  updateTask(task._id, {
                    completed: true,
                  })
                }
              />
            ) : (
              <MdCheckBox
                size={"1.5em"}
                className="icon-button"
                onClick={() =>
                  updateTask(task._id, {
                    completed: false,
                  })
                }
              />
            )}
            {editing && editingTaskId === task._id ? (
              <input
                type="text"
                value={editingTaskValue}
                onChange={(e) => setEditingTaskValue(e.target.value)}
              />
            ) : (
              <span>{task.description}</span>
            )}
            <div>
              {!(editing && editingTaskId === task._id) ? (
                <>
                  <MdModeEdit
                    size={"1.5em"}
                    className="icon-button"
                    onClick={() => handleEdit(task)}
                  />
                  <MdDelete
                    size={"1.5em"}
                    className="icon-button"
                    onClick={() => deleteTask(task._id)}
                  />
                </>
              ) : (
                <MdDone
                  size={"1.5em"}
                  className="icon-button"
                  onClick={() => handleEdit(task)}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
