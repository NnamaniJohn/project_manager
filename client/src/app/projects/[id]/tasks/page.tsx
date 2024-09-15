'use client';

import React, { useEffect, useState } from 'react';
import TaskList from '@/components/task-list';
import TaskModal from '@/components/task-modal';
import { Task, TaskStatus } from '@/types';

const TaskManagement = ({
    params: {id},
  }: {
    params: {
      id: number;
  };
}) => {
  const [tasks, setTasks] = useState([] as Task[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isLoading, setLoading] = useState(true);
  const openEditModal = (task: React.SetStateAction<Task | null>) => {
    setTaskToEdit(task);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const addNewTask = () => {
    setIsEditMode(false);
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const saveTask = (taskData: Task) => {
    if (isEditMode && taskToEdit) {
      const updatedTasks = tasks.map((task) =>
        task.id === taskToEdit.id
          ? { ...task, ...taskData }
          : task
      );
      setTasks(updatedTasks);
    } else {
      const newTask = {
        ...taskData,
        id: tasks.length + 1,
        projectId: id,
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateStatus = (taskId: number, newStatus: TaskStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${id}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data)
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">

      <main className="container mx-auto px-6">
        <div className="flex justify-between items-center py-8 pt-24">
          <h1 className="text-2xl font-bold text-blue-600">Manage Tasks for Project {id}</h1>
          <button
            onClick={addNewTask}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add New Task
          </button>
        </div>
        <h4 className="text-xl font-bold text-blue-600 mb-3">MY Tasks</h4>

        {isLoading && <p className="text-black">Loading...</p>}
        {(!isLoading && !tasks.length) && <p className="text-black">No Tasks</p>}
        {(!isLoading && tasks.length) && <TaskList
          tasks={tasks}
          openEditModal={openEditModal}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
        />}
        <TaskModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          isEditMode={isEditMode}
          taskToEdit={taskToEdit}
          saveTask={saveTask}
        />

      </main>
    </div>
  );
};

export default TaskManagement;
