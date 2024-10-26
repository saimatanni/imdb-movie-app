"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useSWR from "swr";
import Image from "next/image";
import Loader from "@/components/Loader";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { debounce } from "lodash"
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

  const { data, error, mutate } = useSWR(
    `/api/movies?page=${page}&query=${query}`,
    fetcher,
    { revalidateOnFocus: false } // Prevent refetch on window focus
  );

  const { register, watch, formState: { errors } } = useForm<{ query: string }>();

  const watchedQuery = watch("query", "");

  // Update movies based on new data
  useEffect(() => {
    if (data) {
      setMovies((prev) => page === 1 ? data.results : [...prev, ...data.results]);
      setLoading(false);
    }
  }, [data, page]);

  const loadMoreMovies = () => {
    if (!loading) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };

  // Debounced search function to reset page and query
  const debouncedSearch = useCallback(
    debounce((searchQuery: string) => {
      setMovies([]);   // Clear previous movies
      setPage(1);      // Reset to first page on search
      setQuery(searchQuery); // Update query
      mutate();        // Trigger SWR to refetch
    }, 500),
    [mutate]
  );

  // Trigger search on query input change
  useEffect(() => {
    if (watchedQuery.trim().length >= 3) {
      debouncedSearch(watchedQuery);
    }
  }, [watchedQuery, debouncedSearch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
        loadMoreMovies();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  if (error) return <div className="text-center text-red-500">Failed to load movies</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          {...register("query", { minLength: 3 })}
          className="border border-gray-300 rounded-md p-2 w-80 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
          placeholder="Search for movies..."
        />
        {errors.query && <span className="text-red-500">Minimum 3 characters required</span>}
      </div>

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
              <h3 className="mt-2 font-semibold text-gray-800 dark:text-white">{movie.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{movie.release_date}</p>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Loading State */}
      {loading && <Loader />} {/* Use Loader component when loading */}
    </div>
  );
}
