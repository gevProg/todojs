import React, { useState } from "react";

function TodoApp() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id) => {
    setEditing(id);
    const task = tasks.find((t) => t.id === id);
    setEditingText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: editingText } : task
      )
    );
    setEditing(null);
    setEditingText("");
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            {editing === task.id ? (
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(task.id)}>Save</button>
              </>
            ) : (
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.text}
              </span>
            )}
            <button onClick={() => deleteTask(task.id)}>Delete</button>
            {!editing && <button onClick={() => editTask(task.id)}>Edit</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
