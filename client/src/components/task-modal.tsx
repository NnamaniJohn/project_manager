import React, { useEffect, useState } from 'react';
import { Task, TaskStatus } from '@/types';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  isEditMode: boolean;
  taskToEdit: Task | null;
  saveTask: (task: Task) => void;
}

const TaskModal = ({ isOpen, closeModal, isEditMode, taskToEdit, saveTask }: Props) => {
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: TaskStatus.Pending
  });

  useEffect(() => {
    if (isEditMode && taskToEdit) {
      setTaskData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        dueDate: taskToEdit.dueDate,
        status: taskToEdit.status,
      });
    } else {
      setTaskData({ title: '', description: '', dueDate: '', status: TaskStatus.Pending });
    }
  }, [isEditMode, taskToEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleSubmit = () => {
    saveTask(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{isEditMode ? 'Edit Task' : 'Add New Task'}</h2>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Task Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Task Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter task description"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Task Status</label>
          <select
            name="status"
            value={taskData.status}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value={TaskStatus.Pending}>Pending</option>
            <option value={TaskStatus.InProgress}>In-Progress</option>
            <option value={TaskStatus.Completed}>Completed</option>
          </select>
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
            {isEditMode ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
