'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  const token = localStorage.getItem("token");

  return (
    <header className="container mx-auto bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center py-3 px-6">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">ProjectManager</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          {!token && <><Link href="/login" className="text-gray-600 hover:text-blue-600 px-4">Signin</Link><Link
            href="/register" className="text-gray-600 hover:text-blue-600 px-4">Register</Link></>}
          {token && <button className="text-gray-600 hover:text-blue-600 px-4"
                   onClick={() => {
                     localStorage.removeItem('token');
                     window.location.href = '/login';
                   }}
          >Logout</button>}
        </nav>
      </div>
    </header>
  )
}