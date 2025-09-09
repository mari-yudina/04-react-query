import axios from "axios";
import type { Movie } from "../types/movie";


interface FetchMovieResponse {
 results: Movie[];
 
}


const url = 'https://api.themoviedb.org/3/search/movie';
 const token = import.meta.env.VITE_TMDB_TOKEN;



export async function fetchMovies  (searchValue: string): Promise<Movie[]>  {

const res = await axios.get<FetchMovieResponse>(
    url, {
    params: {
      query: searchValue,
      include_adult: false,
      language: 'en-US',
      page: 1,
    
    },
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }
  );
  console.log("Відповідь з бекенду:", res.data);
  return res.data.results;
};