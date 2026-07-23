import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "http://task-manager-alb-1481202461.us-east-1.elb.amazonaws.com";

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await fetch(`${API_URL}/api/tasks`);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Task Manager</h1>

        <p className="subtitle">
          Three-Tier Application (React + Node.js + PostgreSQL)
        </p>

        <div className="input-section">
          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <button onClick={addTask}>+ Add Task</button>
        </div>

        <div className="stats">
          <div className="stat-box">
            <h2>{tasks.length}</h2>
            <span>Total Tasks</span>
          </div>

          <div className="stat-box">
            <h2>3</h2>
            <span>Application Tiers</span>
          </div>
        </div>

        <div className="task-container">
          {tasks.length === 0 ? (
            <p className="empty">No Tasks Available</p>
          ) : (
            tasks.map((task) => (
              <div className="task-card" key={task.id}>
                <span>{task.title}</span>

                <button
                  className="delete"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
