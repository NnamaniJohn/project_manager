// __tests__/ProjectModal.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectModal from '@/components/project-modal';

describe('ProjectModal Component', () => {
  it('renders correctly when modal is open', () => {
    render(
      <ProjectModal
        isOpen={true}
        closeModal={jest.fn()}
        isEditMode={false}
        projectToEdit={null}
        saveProject={jest.fn()}
      />
    );

    expect(screen.getByText(/add new project/i)).toBeInTheDocument();
  });
});
