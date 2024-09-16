import React from 'react';
import { Project } from '@/types';
import Link from 'next/link';

interface Props {
  project: Project;
  deleteProject: (projectId: number) => void;
  openProjectModal: (project: Project) => void;
}

const ProjectItem = ({ project, deleteProject, openProjectModal }: Props) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{project.title}</h2>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-gray-500">Tasks: {project.tasksCount}</span>
        <div className='flex'>
          <button
            onClick={() => openProjectModal(project)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Edit
          </button>
          <Link href={`/projects/${project.id}/tasks`}
                className="bg-blue-600 text-white ml-2 px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            View Tasks
          </Link>
          <button
            onClick={() => deleteProject(project.id as number)}
            className="bg-red-600 text-white ml-2 px-4 py-2 rounded-md hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectItem;
