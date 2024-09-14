'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold text-blue-600">
          <Link href="/">ProjectManager</Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-blue-600">Signin</Link>
          <Link href="#" className="text-gray-600 hover:text-blue-600">Register</Link>
        </nav>

        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center space-y-4 py-4">
            <Link href="#" className="text-gray-600 hover:text-blue-600">Signin</Link>
            <Link href="#" className="text-gray-600 hover:text-blue-600">Register</Link>
          </ul>
        </nav>
      )}
    </header>
  )
}