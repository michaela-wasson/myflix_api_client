import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.title,
            Description: movie.description,
            ImagePath: movie.imagePath, 
            Genre: {
              //Name: movie.genre.Name,
              Description: movie.genre.Description
            },
            Director: {
              Name: movie.director.Name,
              Bio: movie.director.Bio,
              Birth: movie.director.Birth,
              Death: movie.director.Death
            }, 
            Featured: movie.featured
          }
  });


        setMovies(moviesFromApi);
      });
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>Nothing here!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};