'use client';

import React, { useState } from 'react';
import { Project } from '@/types';
import ProjectModal from '@/components/project-modal';
import ProjectList from '@/components/project-list';

const initialProjects: Project[] = [
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

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const openProjectModal = (project: React.SetStateAction<Project | null>) => {
    setProjectToEdit(project);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const addNewProject = () => {
    setIsEditMode(false);
    setProjectToEdit(null);
    setIsModalOpen(true);
  };

  const saveProject = (projectData: Project) => {
    if (isEditMode && projectToEdit) {
      const updatedProjects = projects.map((project) =>
        project.id === projectToEdit.id
          ? { ...project, ...projectData }
          : project
      );
      setProjects(updatedProjects);
    } else {
      const newProject = {
        ...projectData,
        id: projects.length + 1,
        taskCount: 0,
      };
      setProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
  };

  return (
      <div className="container min-h-screen bg-gray-100 mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-4xl font-bold text-blue-600">MY Projects</h1>
          <button
            onClick={addNewProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">New Project
          </button>
        </div>
        <ProjectList
          projects={projects}
          openProjectModal={openProjectModal}
        />
        <ProjectModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          isEditMode={isEditMode}
          projectToEdit={projectToEdit}
          saveProject={saveProject}
        />
      </div>
  );
};

export default Projects;
