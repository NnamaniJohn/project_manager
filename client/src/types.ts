export interface Task {
  id?: number;
  title: string;
  description?: string;
  dueDate?: string;
  status: TaskStatus;
  projectId?: number;
}

export interface Project {
  id?: number;
  title: string;
  description?: string;
  tasks?: Task[];
  tasksCount?: number;
}

export enum TaskStatus {
  Pending = 'pending',
  InProgress = 'in-progress',
  Completed = 'completed',
}

