import React from 'react';
import { Task, TaskStatus } from '@/types';

interface Props {
  task: Task,
  openEditModal: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  updateStatus: (taskId: number, status: TaskStatus) => void;
}

const TaskItem = ({ task, openEditModal, deleteTask, updateStatus }: Props) => {
  const getStatusBadgeColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.Pending:
        return 'bg-yellow-500';
      case TaskStatus.InProgress:
        return 'bg-blue-500';
      case TaskStatus.Completed:
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-2">{task.description}</p>
      <p className="text-gray-500 mb-2">Due: {task.dueDate ? (new Date(task.dueDate as string)).toLocaleDateString() : ''}</p>
      <div className={`inline-block px-3 py-1 text-sm font-semibold text-white rounded-full ${getStatusBadgeColor(task.status)}`}>
        {task.status}
      </div>
      <div className="flex items-center space-x-4 mt-4">
        {task.status !== TaskStatus.Completed && (
          <select
            value={task.status}
            onChange={(e) => updateStatus(task.id, e.target.value as TaskStatus)}
            className="bg-gray-100 text-gray-700 p-2 rounded-md focus:ring-2 focus:ring-blue-600"
          >
            <option value={TaskStatus.Pending}>Pending</option>
            <option value={TaskStatus.InProgress}>In-Progress</option>
            <option value={TaskStatus.Completed}>Completed</option>
          </select>
        )}
        <button
          onClick={() => openEditModal(task)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
