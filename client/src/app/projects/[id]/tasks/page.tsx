'use client';

import dynamic from 'next/dynamic';

const Tasks = dynamic(() => import('@/components/task'), { ssr: false });

const TaskManagement = ({
    params: {id},
  }: {
    params: {
      id: number;
  };
}) => {
  return (
    <>
      <Tasks params={{id}} />
    </>
  )
};

export default TaskManagement;
