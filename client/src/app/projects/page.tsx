'use client';

import React, { useEffect, useState } from 'react';
import { Project } from '@/types';
import ProjectModal from '@/components/project-modal';
import ProjectList from '@/components/project-list';
import useAuth from '@/components/use-auth';

const Projects = () => {
  const [projects, setProjects] = useState([] as Project[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [isLoading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

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
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setProjects(projects.filter((project) => project.id !== projectId));
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, projects]);

  return (
      <div className="container min-h-screen bg-gray-100 mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-4xl font-bold text-blue-600">MY Projects</h1>
          <div>
            <input
              type="text"
              placeholder="Search projects"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 mr-2 text-gray-600"
            />
            <button
              onClick={addNewProject}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">New Project
            </button>
          </div>
        </div>

        {isLoading && <p className="text-black">Loading...</p>}
        {(!isLoading && projects.length) && <ProjectList
          projects={filteredProjects}
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

export default useAuth(Projects);
