"use client"; // ✅ must be first line

import { useState } from "react";
import Link from "next/link";
import { FaUser } from "react-icons/fa";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide text-gray-800 flex items-center gap-2"
          >
            🏫 School Project
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-gray-800 font-medium transition-colors">Home</Link>
            <Link href="/addSchool" className="flex items-center gap-2 text-gray-700 hover:text-indigo-700 font-medium transition-colors">Add School</Link>
            <Link href="/about" className="text-gray-700 hover:text-indigo-700 font-medium transition-colors">About</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-indigo-50 transition">
              <FaUser /> Login
            </Link>
            <Link href="/signup" className="px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-900 shadow-md transition">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
         <button
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
  className="md:hidden flex items-center px-3 py-2 rounded-lg border border-gray-400 text-gray-700 hover:bg-gray-100 transition z-50"
>
  ☰
</button>

        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md px-6 py-4 space-y-3">
          <Link href="/" className="block text-gray-700 font-medium hover:text-gray-800" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/addSchool" className="block text-gray-700 font-medium hover:text-indigo-700" onClick={() => setIsMobileMenuOpen(false)}>Add School</Link>
          <Link href="/about" className="block text-gray-700 font-medium hover:text-indigo-700" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <div className="border-t border-gray-300 mt-2 pt-2 space-y-2">
            <Link href="/login" className="block flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 font-medium hover:bg-indigo-50" onClick={() => setIsMobileMenuOpen(false)}> <FaUser /> Login </Link>
            <Link href="/signup" className="block px-4 py-2 rounded-lg bg-gray-700 text-white font-medium hover:bg-gray-900 shadow-md" onClick={() => setIsMobileMenuOpen(false)}>Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
