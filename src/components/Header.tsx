'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure that the component is mounted before applying the theme (fixes SSR issue)
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-yellow-500">
          IMDB
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link href="/" className="text-gray-800 dark:text-white hover:underline">
            Home
          </Link>
        </nav>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
        >
          {theme === 'dark' ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-yellow-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5M12 19.5V21M4.222 4.222l1.061 1.06M17.657 17.657l1.061 1.061M3 12h1.5M19.5 12H21M4.222 19.778l1.061-1.06M17.657 6.343l1.061-1.061"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-800 dark:text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0112.002 21c-5.351 0-9.719-4.366-9.719-9.719a9.719 9.719 0 016.2-9.135 0.75 0.75 0 011.054 0.759c-.141 3.621 1.417 7.149 4.157 9.127 2.74 1.978 6.15 2.335 9.065 1.22a0.75 0.75 0 01.993.808z"
              />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
