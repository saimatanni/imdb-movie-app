// Define a type for movie details
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: Genre[];
}

// Define a type for genre
export interface Genre {
  id: number;
  name: string;
}

// Define a type for cast member
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

// Define a type for recommendations
export interface Recommendation {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}
