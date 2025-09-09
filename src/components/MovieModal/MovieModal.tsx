
import css from "./MovieModal.module.css"
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { getImageUrl } from "../../utils/getImageUrl";



interface MovieModalProps {
    movie: Movie;
    onClose: () => void;
      
}




export default function MovieModal({ movie,onClose }: MovieModalProps) {

    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    console.log("Модалка відкрилась");
	  const handleKeyDown = (e: KeyboardEvent) => {
	    if (e.key === "Escape") {
	      onClose();
	    }
	  };
	
	  document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
	
	  return () => {
       console.log("Модалка закрилась");
	    document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";

	  };
	}, [onClose]);


  return createPortal(

<div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
  <div className={css.modal} >
    <button className={css.closeButton} aria-label="Close modal" onClick={onClose}>
      &times;
    </button>
   
    <img
      src={getImageUrl(movie.backdrop_path)}
      alt={movie.title}
      className={css.image}
    />
    <div className={css.content}>
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p>
        <strong>Rating:</strong> {movie.vote_average}/10
      </p>
    </div>
  </div>
</div>,
document.body
  );
}
