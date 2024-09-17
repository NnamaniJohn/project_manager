'use client';

import dynamic from 'next/dynamic';

const Login = dynamic(() => import('@/components/login'), { ssr: false });

export default function LoginPage() {
  return (
    <>
      <Login />
    </>
  )
}
