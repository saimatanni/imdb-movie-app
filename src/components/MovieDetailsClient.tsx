

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
   
      <AddToWatchlistButton
        movieId={movieId}
        movieTitle={movieTitle}
        moviePosterPath={moviePosterPath}
        
      />
    </div>
  );
}
