
import css from "./App.module.css"

import { useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";




export default function App() {
const [movies, setMovies] = useState<Movie[]>([]);
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [hasError, setHasError] = useState(false);
const [isLoading, setIsLoading] = useState(false);

    const handleSearch = async (searchValue: string) => {


    try {
        setHasError(false);
        setIsLoading(true);
      const newMovies = await fetchMovies(searchValue);
       if (newMovies.length === 0) {
      toast.error("No movies found for your request.");
    }

   

    

      setMovies(newMovies);
      setSelectedMovie(null);
    } catch {
      
      setHasError(true);
    } 
    finally {
      setIsLoading(false);
    }
  };


   const handleSelectMovie = (movie: Movie) => {
    if (selectedMovie) return;
    setSelectedMovie(movie);
    console.log("Вибраний фільм:", movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
  <div className={css.app}>
    <Toaster position="top-center" />
    {isLoading && <Loader />}
    <SearchBar onSubmit={handleSearch}/>
    
     {hasError ? (
        <ErrorMessage />
      ) : (
        movies.length > 0 && (
          <MovieGrid movies={movies} onSelect={handleSelectMovie} />
        )
      )}

   

       {selectedMovie && (<MovieModal movie={selectedMovie} onClose={handleCloseModal}/>
        
      )}  
      
  </div>
	
  );
}
