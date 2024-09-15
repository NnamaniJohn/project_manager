'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types';
import ProjectModal from '@/components/project-modal';
import ProjectList from '@/components/project-list';

const Projects = () => {
  const [projects, setProjects] = useState([] as Project[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isLoading, setLoading] = useState(true)

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
        tasksCount: 0,
      };
      setProjects([...projects, newProject]);
    }
    setIsModalOpen(false);
  };

  const deleteProject = async (projectId: number) => {
    await fetch(`http://localhost:3000/projects/${projectId}`, {
      method: 'DELETE',
    });
    setProjects(projects.filter((project) => project.id !== projectId));
  }

  useEffect(() => {
    fetch('http://localhost:3000/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  return (
      <div className="container min-h-screen bg-gray-100 mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-4xl font-bold text-blue-600">MY Projects</h1>
          <button
            onClick={addNewProject}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">New Project
          </button>
        </div>

        {isLoading && <p className="text-black">Loading...</p>}
        {(!isLoading && !projects.length) && <p className="text-black">No projects</p>}
        {(!isLoading && projects.length) && <ProjectList
          projects={projects}
          deleteProject={deleteProject}
          openProjectModal={openProjectModal}
        />}
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
