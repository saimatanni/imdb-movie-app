import { NextResponse } from 'next/server';
import axios from 'axios';

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get('page') || '1';
  const query = searchParams.get('query') || '';

  const endpoint = query
    ? `${BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`
    : `${BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`;

  try {
    const response = await axios.get(endpoint);
    return NextResponse.json(response.data);
  } catch (error) {
    console.log('error', error)
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}
