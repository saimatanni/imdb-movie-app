"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Update the type definitions
type WatchlistContextType = {
  watchlist: number; // Change watchlist to be a number (the count)
  addToWatchlist: (count: number) => void; // Accepts a number instead of a Movie object
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState(0); // Initialize watchlist as a count (number)

  // Updated addToWatchlist to accept a number as the count
  const addToWatchlist = (count: number) => {
    console.log("count", count);
    setWatchlist(count); // Set watchlist to the provided count
  };

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};
