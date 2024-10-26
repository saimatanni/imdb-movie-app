

"use client";

import AddToWatchlistButton from "@/components/AddToWatchlistButton";

type MovieDetailsClientProps = {
  movieId: string;
  movieTitle: string;
  moviePosterPath: string;
};

export default function MovieDetailsClient({
  movieId,
  movieTitle,
  moviePosterPath,
}: MovieDetailsClientProps) {
  return (
    <div>
      {/* The interactive AddToWatchlistButton component */}
      <AddToWatchlistButton
        movieId={movieId}
        movieTitle={movieTitle}
        moviePosterPath={moviePosterPath}
        onUpdateWishlist={() => {
          // Optionally handle any wishlist updates here
        }}
      />
    </div>
  );
}
