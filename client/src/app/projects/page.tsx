import React from 'react';

const projects = [
  {
    id: 1,
    title: 'Website Redesign',
    description: 'Redesigning the company website for a fresh, modern look.',
    tasksCount: 5,
  },
  {
    id: 2,
    title: 'Mobile App Development',
    description: 'Building a new mobile app for Android and iOS platforms.',
    tasksCount: 12,
  },
  {
    id: 3,
    title: 'Marketing Campaign',
    description: 'Launching a digital marketing campaign for the new product.',
    tasksCount: 8,
  },
];

const ProjectList = () => {
  return (
      <div className="container min-h-screen bg-gray-100 mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-4xl font-bold text-blue-600">MY Projects</h1>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">New Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-gray-500">Tasks: {project.tasksCount}</p>
              <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">View Tasks</button>
            </div>
          ))}
        </div>
      </div>
  );
};

export default ProjectList;
