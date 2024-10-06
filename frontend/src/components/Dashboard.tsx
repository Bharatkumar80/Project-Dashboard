import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  project: string;
  completed: boolean;
}

const API_URL = 'http://localhost:5000/api/tasks';

const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTaskTitle.trim() !== "") {
      try {
        const response = await axios.post(API_URL, {
          title: newTaskTitle,
          project: "New Project",
        });
        setTasks([response.data, ...tasks]);
        setNewTaskTitle("");
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      await axios.put(`${API_URL}/${taskId}`, { completed: !completed });
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, completed: !completed } : task
      ));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Tasks</h3>
          <div className="flex mb-4">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow border rounded-l px-2 py-1"
            />
            <button
              onClick={addTask}
              className="bg-purple-600 text-white px-4 py-1 rounded-r"
            >
              Add
            </button>
          </div>
          {tasks.map((task) => (
            <div key={task._id} className="flex items-center py-2 border-b last:border-b-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTaskCompletion(task._id, task.completed)}
                className="mr-3"
              />
              <div className="flex-grow">
                <p className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">in {task.project}</p>
              </div>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-purple-100 text-purple-700 p-4 rounded-lg flex flex-col items-center">
              <Plus className="w-8 h-8 mb-2" />
              New Note
            </button>
            <button className="bg-blue-100 text-blue-700 p-4 rounded-lg flex flex-col items-center">
              <Plus className="w-8 h-8 mb-2" />
              New Event
            </button>
            <button className="bg-green-100 text-green-700 p-4 rounded-lg flex flex-col items-center">
              <Plus className="w-8 h-8 mb-2" />
              New Task
            </button>
            <button className="bg-yellow-100 text-yellow-700 p-4 rounded-lg flex flex-col items-center">
              <Plus className="w-8 h-8 mb-2" />
              New Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
