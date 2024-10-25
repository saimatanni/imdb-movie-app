import { notFound } from "next/navigation";
import Image from "next/image";
import { CastMember, Genre, Recommendation } from "@/types/movie";

import MovieDetailsClient from "@/components/MovieDetailsClient";
import Link from "next/link";

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;

async function fetchMovieDetails(movieId: string) {
  const movieRes = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const castRes = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );
  const recommendationsRes = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`,
    { next: { revalidate: 60 } }
  );

  if (!movieRes.ok || !castRes.ok || !recommendationsRes.ok) {
    return null;
  }

  const movie = await movieRes.json();
  const cast = await castRes.json();
  const recommendations = await recommendationsRes.json();

  return { movie, cast, recommendations };
}

export default async function MovieDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const movieId = params.id;

  const data = await fetchMovieDetails(movieId);

  if (!data) {
    notFound();
  }

  const { movie, cast, recommendations } = data;
  // Slider settings for cast section

  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-gray-100">
      {/* Movie Poster and Info */}

      <div className="lg:flex lg:gap-8 lg:items-start mb-12 bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-lg shadow-xl">
        <div className="lg:w-1/3 w-full mt-6 lg:mt-0 relative">
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            className="rounded-lg shadow-2xl object-cover"
          />
        </div>
        <div className="lg:w-2/3 w-full lg:pl-8 pl-0">
          <div className="mb-4">
            <h1 className="text-5xl font-extrabold mb-4 text-white">
              {movie.title}
            </h1>
            <p className="text-lg text-gray-300 dark:text-gray-400 flex items-center space-x-4">
              <span>{new Date(movie.release_date).getFullYear()}</span>
              <span>•</span>
              <span>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </span>
            </p>
          </div>
          <div className="mb-6">
            <h4 className="font-semibold text-xl text-gray-300">Genres</h4>
            <p className="text-white">
              {movie.genres.map((genre: Genre) => genre.name).join(", ")}
            </p>
          </div>
          <p className="mb-8 leading-relaxed text-gray-200">{movie.overview}</p>

          {/* Use the AddToWatchlistButton client component */}
          <MovieDetailsClient
            movieId={movieId}
            movieTitle={movie.title}
            moviePosterPath={movie.poster_path}
          />
        </div>
      </div>

      {/* Cast Section */}

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {cast.cast.slice(0, 10).map((member: CastMember) => (
            <div key={member.id} className="text-center">
              {member.profile_path ? (
                <div className="w-[150px] h-[150px] mx-auto">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${member.profile_path}`}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="rounded-full object-cover border-4 border-gray-300 shadow-md w-full h-full"
                  />
                </div>
              ) : (
                <div className="w-[150px] h-[150px] bg-gray-300 rounded-full border-4 border-gray-300 mx-auto"></div>
              )}
              <p className="mt-4 font-semibold text-lg">{member.name}</p>
              <p className="text-gray-500 text-sm">{member.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
    
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {recommendations.results.slice(0, 5).map((rec: Recommendation) => (
            <div
              key={rec.id}
              className="text-center cursor-pointer transition transform hover:scale-105"
            >
              <Link href={`/movies/${rec.id}`} passHref>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${rec.poster_path}`}
                  alt={rec.title}
                  width={200}
                  height={300}
                  className="rounded-lg shadow-lg hover:shadow-xl"
                />
                <p className="mt-2 font-semibold">{rec.title}</p>
                <p className="text-sm">{rec.release_date}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
