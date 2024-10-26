let watchlist: string[] = [];

export const addToWatchlist = (movieId: string) => {
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
  }
};

export const removeFromWatchlist = (movieId: string) => {
  watchlist = watchlist.filter((id) => id !== movieId);
};

export const getWatchlist = () => watchlist;
