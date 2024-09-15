'use client';

import React, { useState } from 'react';

const tasks = [
  {
    id: 1,
    title: 'Design homepage',
    description: 'Create a new design for the homepage.',
    status: 'Pending',
    dueDate: '2024-09-20',
  },
  {
    id: 2,
    title: 'Set up database',
    description: 'Create a MySQL database for the project.',
    status: 'In-Progress',
    dueDate: '2024-09-18',
  },
  {
    id: 3,
    title: 'Develop login functionality',
    description: 'Build the login system with JWT authentication.',
    status: 'Completed',
    dueDate: '2024-09-22',
  },
];

const TaskManagement = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-2xl font-bold text-blue-600">Manage Tasks for Project </h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add New Task
          </button>
        </div>
        <h4 className="text-xl font-bold text-blue-600 mb-3">MY Tasks</h4>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
              <p className="text-gray-600 mb-2">{task.description}</p>
              <p className="text-gray-500 mb-2">Due: {task.dueDate}</p>
              <div
                className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full bg-green-400`}>
                {task.status}
              </div>
              <div className="flex items-center space-x-4 mt-4">
                {task.status !== 'Completed' && (
                  <select
                    value={task.status}
                    className="bg-gray-100 text-gray-700 p-2 rounded-md focus:ring-2 focus:ring-blue-600">
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                )}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TaskManagement;
