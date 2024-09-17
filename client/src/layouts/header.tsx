import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="container mx-auto bg-white shadow-md fixed w-full z-50">
      <div className="flex justify-between items-center py-3 px-6">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">ProjectManager</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-blue-600 px-4">Signin</Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600 px-4">Register</Link>
        </nav>
      </div>
    </header>
  )
}