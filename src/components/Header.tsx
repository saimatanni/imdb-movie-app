"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useWatchlist } from "@/context/WatchlistContext";


const getWishlistCount = () => {
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return wishlist.length;
};

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);


  const { watchlist, addToWatchlist } = useWatchlist();
 // Ensure that the component is mounted before applying the theme (fixes SSR issue)
 useEffect(() => {
  setMounted(true);
  
  addToWatchlist(getWishlistCount())
}, []);



if (!mounted) return null;


  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
  
        <Link href="/" className="text-2xl font-extrabold text-white bg-yellow-500 px-4 py-1 rounded-md">
          IMDB
        </Link>

        {/* Wishlist Icon with Count */}
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Link href="/watchlist">
              <button className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition">
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
                    d="M6.75 3a2.25 2.25 0 00-2.25 2.25v15.487l6.75-3.375 6.75 3.375V5.25A2.25 2.25 0 0017.25 3H6.75z"
                  />
                </svg>
              </button>
            </Link>
            {watchlist > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
                {watchlist}
              </span>
            )}
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-200 dark:bg-gray-700 p-2 rounded-full"
          >
            {theme === "dark" ? (
              <IoMdSunny className="text-yellow-500 text-lg" />
            ) : (
              <IoMoon className="text-lg text-gray-600" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
