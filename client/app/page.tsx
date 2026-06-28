"use client";

import { useEffect, useState } from "react";

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const API = "http://localhost:5000/api/tasks";

  const fetchTasks = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title) return;

    await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
      }),
    });

    setTitle("");
    setDescription("");

    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await fetch(`${API}/${id}`, {
      method: "DELETE",
    });

    fetchTasks();
  };

  const toggleTask = async (task: Task) => {
    await fetch(`${API}/${task._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Mini Task Manager
        </h1>

        <input
          className="w-full border p-3 rounded mb-3"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded mb-3"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-blue-600 text-white px-6 py-3 rounded w-full"
        >
          Add Task
        </button>

        <div className="mt-8 space-y-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="border rounded-lg p-4 bg-gray-50"
            >
              <h2
  className={`font-bold text-lg text-black ${
    task.completed ? "line-through text-gray-500" : ""
  }`}

              >
                {task.title}
              </h2>

              <p>{task.description}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => toggleTask(task)}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>

                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}