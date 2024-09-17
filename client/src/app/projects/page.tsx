'use client';

import dynamic from 'next/dynamic';

const Projects = dynamic(() => import('@/components/project'), { ssr: false });
const ProjectsPage = () => {
  return (
    <>
      <Projects />
    </>
  )
};

export default ProjectsPage;
