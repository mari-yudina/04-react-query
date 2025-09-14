import css from "./App.module.css";

import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import MovieModal from "../MovieModal/MovieModal";
import toast, { Toaster } from "react-hot-toast";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";

export default function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [searchValue, setSearchValue] = useState("");
  const [curPage, setCurPage] = useState(1);

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    setCurPage(1);
  };

  const handleSelectMovie = (movie: Movie) => {
    if (selectedMovie) return;
    setSelectedMovie(movie);
    console.log("Вибраний фільм:", movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["movies", searchValue, curPage],
    queryFn: () => fetchMovies(searchValue, curPage),
    enabled: Boolean(searchValue),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (data?.total_results === 0) {
      toast.error("No movies found for your request.");
    }
  }, [data]);

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <SearchBar onSubmit={handleSearch} />

      {isSuccess && data?.total_pages > 1 && (
        <ReactPaginate
          pageCount={data?.total_pages ?? 0}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setCurPage(selected + 1)}
          forcePage={curPage - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
          renderOnZeroPageCount={null}
        />
      )}

      {data && (
        <MovieGrid
          movies={data.results}
          onSelect={handleSelectMovie}
        />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
