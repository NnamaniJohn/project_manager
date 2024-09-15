import React, { useState, useEffect } from 'react';
import { Project } from '@/types';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode: boolean;
  projectToEdit: Project | null;
  saveProject: (project: any) => void;
}

const ProjectModal = ({ isOpen, closeModal, isEditMode, projectToEdit, saveProject }: Props) => {
  const [projectData, setProjectData] = useState<Project>({
    title: '',
    description: ''
  });

  useEffect(() => {
    if (isEditMode && projectToEdit) {
      setProjectData({
        title: projectToEdit.title,
        description: projectToEdit.description,
      });
    } else {
      setProjectData({ title: '', description: '' });
    }
  }, [isEditMode, projectToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const handleSubmit = () => {
    saveProject(projectData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditMode ? 'Edit Project' : 'Add New Project'}</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={projectData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter project title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Project Description</label>
          <textarea
            name="description"
            value={projectData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter project description"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            {isEditMode ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
