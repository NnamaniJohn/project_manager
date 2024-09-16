import { render, screen } from '@testing-library/react';
import TaskList from '@/components/task-list';
import { Task, TaskStatus } from '@/types';

const mockTasks: Task[] = [
  { id: 1, title: 'Task Title 1', description: 'Task 1 description', status: TaskStatus.Pending },
  { id: 2, title: 'Task Title 2', description: 'Task 2 description', status: TaskStatus.Completed },
];

describe('TaskList Component', () => {
  it('renders all tasks', () => {
    render(<TaskList tasks={mockTasks}  deleteTask={jest.fn()} openEditModal={jest.fn()} updateStatus={jest.fn()}/>);

    const taskItems = screen.getAllByText(/task title/i);
    expect(taskItems.length).toBe(mockTasks.length);
  });
});
