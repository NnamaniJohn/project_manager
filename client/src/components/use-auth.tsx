'use client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

const UseAuth = ({
                   children,
                 }: Readonly<{
  children: React.ReactNode;
}>) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return (
      <div>
        {children}
      </div>
    )
};

export default UseAuth;
