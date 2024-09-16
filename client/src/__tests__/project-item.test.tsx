import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectItem from '@/components/project-item';

describe('ProjectItem Component', () => {
  it('renders project details correctly', () => {
    const project = { id: 1, title: 'Test Project', description: 'Test Description', tasksCount: 5 };
    render(<ProjectItem project={project} deleteProject={jest.fn()} openProjectModal={jest.fn()} />);

    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('Tasks: 5')).toBeInTheDocument();
  });

  it('calls openProjectModal when "Edit" button is clicked', () => {
    const mockOpenModal = jest.fn();
    const project = { id: 1, title: 'Test Project', description: 'Test Description', tasksCount: 5 };
    render(<ProjectItem project={project} deleteProject={jest.fn()} openProjectModal={mockOpenModal} />);

    const button = screen.getByText(/edit/i);
    fireEvent.click(button);

    expect(mockOpenModal).toHaveBeenCalledWith(project);
  });
});
