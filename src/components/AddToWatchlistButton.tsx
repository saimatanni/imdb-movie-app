"use client";


import { useWatchlist } from "@/context/WatchlistContext";
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
  const { addToWatchlist, } = useWatchlist();
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
      addToWatchlist(watchlist.length)

      localStorage.setItem("wishlist", JSON.stringify(watchlist));
      setIsAdded(false);
    } else {
      // Add to watchlist (ensure poster path is stored correctly)
      watchlist.push({ movieId, movieTitle, moviePosterPath });

      addToWatchlist(watchlist.length)
      localStorage.setItem("wishlist", JSON.stringify(watchlist));
      setIsAdded(true);
    }

    // Trigger parent component to update wishlist count
    onUpdateWishlist();
  };

  return (
    <button
      onClick={handleWatchlistToggle}
      className={`px-4 py-2 rounded ${isAdded ? "bg-red-500" : "bg-blue-500"} text-white`}
    >
      {isAdded ? "Remove from Watchlist" : "Add to Watchlist"}
    </button>
  );
}
