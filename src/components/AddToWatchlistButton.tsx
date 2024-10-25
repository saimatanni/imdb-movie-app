"use client";


import { useState, useEffect } from "react";

type Props = {
  movieId: string;
  movieTitle: string;
  moviePosterPath: string; // Ensure this is the correct path
  onUpdateWishlist: () => void;
};

interface Movie {
  movieId: string;
  movieTitle: string;
  moviePosterPath: string;
}

export default function AddToWatchlistButton({
  movieId,
  movieTitle,
  moviePosterPath,
  onUpdateWishlist,
}: Props) {
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    const watchlist: Movie[] = JSON.parse(localStorage.getItem("wishlist") || "[]");
    if (watchlist.some((movie) => movie.movieId === movieId)) {
      setIsAdded(true);
    }
  }, [movieId]);

  const handleWatchlistToggle = () => {
    let watchlist: Movie[] = JSON.parse(localStorage.getItem("wishlist") || "[]");

    if (isAdded) {
      // Remove from watchlist
      watchlist = watchlist.filter((movie) => movie.movieId !== movieId);
      localStorage.setItem("wishlist", JSON.stringify(watchlist));
      setIsAdded(false);
    } else {
      // Add to watchlist (ensure poster path is stored correctly)
      watchlist.push({ movieId, movieTitle, moviePosterPath });
      localStorage.setItem("wishlist", JSON.stringify(watchlist));
      setIsAdded(true);
    }

    // Trigger parent component to update wishlist count
    onUpdateWishlist();
  };

  return (
    <button
      onClick={handleWatchlistToggle}
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
