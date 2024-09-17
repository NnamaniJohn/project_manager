import React from 'react';
import TaskItem from '@/components/task-item';
import { Task, TaskStatus } from '@/types';

interface Props {
  tasks: Task[];
  openEditModal: (task: Task) => void;
  deleteTask: (taskId: number) => void;
  updateStatus: (taskId: number, status: TaskStatus) => void;
}

const TaskList = ({ tasks, openEditModal, deleteTask, updateStatus } : Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
      {(!tasks.length) && <p className="text-black">No Tasks</p>}
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          openEditModal={openEditModal}
          deleteTask={deleteTask}
          updateStatus={updateStatus}
        />
      ))}
    </div>
  );
};

export default TaskList;
