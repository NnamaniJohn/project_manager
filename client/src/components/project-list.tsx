import React from 'react';
import ProjectItem from '@/components/project-item';
import { Project } from '@/types';

interface Props {
  projects: Project[];
  openProjectModal: (project: Project) => void;
}

const ProjectList = ({ projects, openProjectModal }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          openProjectModal={openProjectModal}
        />
      ))}
    </div>
  );
};

export default ProjectList;
