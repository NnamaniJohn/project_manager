import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectList from '@/components/project-list';

const mockProjects = [
  { id: 1, title: 'Test Project 1', description: 'Description 1', taskCount: 5 },
  { id: 2, title: 'Test Project 2', description: 'Description 2', taskCount: 10 },
];

describe('ProjectList Component', () => {
  it('renders all projects', () => {
    render(<ProjectList projects={mockProjects} deleteProject={jest.fn()} openProjectModal={jest.fn()} />);

    const projectTitles = screen.getAllByText(/test project/i);
    expect(projectTitles.length).toBe(2);
  });
});
