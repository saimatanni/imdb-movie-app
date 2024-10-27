"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Update the type definitions
type WatchlistContextType = {
  watchlist: number;
  addToWatchlist: (count: number) => void; 
};

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
  const [watchlist, setWatchlist] = useState(0); 

  // Updated addToWatchlist to accept a number as the count
  const addToWatchlist = (count: number) => {
    console.log("count", count);
    setWatchlist(count); 
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
