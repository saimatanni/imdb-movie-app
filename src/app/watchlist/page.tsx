"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for redirection

import { useWatchlist } from "@/context/WatchlistContext";

// Define the Movie interface
interface Movie {
  movieId: string;
  movieTitle: string;
  moviePosterPath: string;
}

// Helper function to get the watchlist from localStorage
const getWatchlist = (): Movie[] => {
  const watchlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
  return watchlist;
};

export default function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState<Movie[]>([]);
  const {  addToWatchlist,  } = useWatchlist();
  useEffect(() => {
    setWatchlistMovies(getWatchlist());
  }, []);

  const handleRemove = (movieId: string) => {
    const updatedWatchlist = watchlistMovies.filter((movie) => movie.movieId !== movieId);
    setWatchlistMovies(updatedWatchlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWatchlist)); // Update localStorage
    addToWatchlist(updatedWatchlist?.length)
  };

  if (watchlistMovies.length === 0) {
    return <p className="text-center mt-8">Your watchlist is empty.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Your Watchlist</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {watchlistMovies.map((movie) => (
          <div key={movie.movieId} className="text-center group">
            {/* Wrap image and title in Link for redirection */}
            <Link href={`/movies/${movie.movieId}`} passHref>
              <div className="block">
                <div className="relative w-full h-[300px] transition-transform duration-300 hover:scale-105">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.moviePosterPath}`}
                    alt={movie.movieTitle}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-lg"
                  />
                </div>
                <p className="mt-2 font-semibold text-gray-900 dark:text-white ">
                  {movie.movieTitle}
                </p>
              </div>
            </Link>

            <button
              onClick={() => handleRemove(movie.movieId)}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
