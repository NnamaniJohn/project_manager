'use client';

import React, { useEffect, useState } from 'react';
import TaskList from '@/components/task-list';
import { Task, TaskStatus } from '@/types';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const UseAuth = dynamic(() => import('@/components/use-auth'), { ssr: false });
const TaskModal = dynamic(() => import('@/components/task-modal'), { ssr: false });

const Tasks = ({
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
  const [isLoading, setLoading] = useState(true);;
  const [project, setProject] = useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

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

  const deleteTask = async (taskId: number) => {
    const token = localStorage.getItem("token");
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateStatus = async (taskId: number, newStatus: TaskStatus) => {
    const updateTask = tasks.find((task) => task.id === taskId);
    await updateRequest({ ...updateTask, title: updateTask?.title as string, status: newStatus });
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const updateRequest = async (taskData: Task) => {
    const token = localStorage.getItem("token");
    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskData?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.map((task: Task) => ({ ...task, id: task._id })))
        setLoading(false)
      })

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data)
      })
  }, [id])

  useEffect(() => {
    setFilteredTasks(
      tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, tasks]);

  return (
    <UseAuth>
      <div className="min-h-screen bg-gray-100">

        <main className="container mx-auto px-6">
          <div className="flex justify-between items-center py-8 pt-24">
            <h1 className="text-2xl font-bold text-blue-600">
              <Link href="/projects">
                My Projects
              </Link>
              {" - "} {project.title}</h1>

            <div>
              <input
                type="text"
                placeholder="Search tasks"
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 mr-2 text-gray-600"
              />
              <button
                onClick={addNewTask}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                Add New Task
              </button>
            </div>
          </div>
          <h4 className="text-xl font-bold text-blue-600 mb-3">MY Tasks</h4>

          {isLoading && <p className="text-black">Loading...</p>}
          {(!isLoading && tasks.length) && <TaskList
            tasks={filteredTasks}
            openEditModal={openEditModal}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
          />}
          <TaskModal
            projectId={id}
            isOpen={isModalOpen}
            closeModal={() => setIsModalOpen(false)}
            isEditMode={isEditMode}
            taskToEdit={taskToEdit}
            saveTask={saveTask}
          />

        </main>
      </div>
    </UseAuth>
  );
};

export default Tasks;
