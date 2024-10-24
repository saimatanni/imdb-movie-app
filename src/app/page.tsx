"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import Loader from "@/components/Loader"; // Import the Loader component
import Link from "next/link";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const { data, error } = useSWR(
    `/api/movies?page=${page}&query=${query}`,
    fetcher
  );

  // Handle data fetching and update movies list
  useEffect(() => {
    if (data) {
      if (isSearching) {
        setMovies(data.results);
        setIsSearching(false);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      setLoading(false);
    }
  }, [data]);

  const loadMoreMovies = () => {
    if (loading) return;
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;

    setMovies([]); // Clear previous movies
    setPage(1); // Reset to first page on search
    setIsSearching(true);
    setLoading(true); // Show loader while searching
  };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100
      ) {
        if (!loading && !isSearching) loadMoreMovies();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, isSearching]);

  if (error)
    return (
      <div className="text-center text-red-500">Failed to load movies</div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex justify-center mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-80 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          placeholder="Search for movies..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
      {/* Movie List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie: Movie) => (
          <Link href={`/movies/${movie.id}`} key={movie.id}>
            <div className="movie-item text-center">
              <div className="relative w-full h-[400px] transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
              </div>
              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">
                {movie.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {movie.release_date}
              </p>
            </div>
          </Link>
        ))}
      </div>
      {/* Loading State */}
      {loading && <Loader />} {/* Use Loader component when loading */}
      {/* Load More Button */}
      {!loading && !isSearching && (
        <button
          onClick={loadMoreMovies}
          className="block mx-auto mt-8 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
}
