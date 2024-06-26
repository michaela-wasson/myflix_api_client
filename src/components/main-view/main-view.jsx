import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {

  const [movies, setMovies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);   


  useEffect(() => {
      fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/movies")
          .then((response) => response.json())
          .then((data) => {
              console.log(data);
              const moviesFromAPI = data.map(movie => {
                  return {
                      _id: movie._id,
                      ImageUrl: movie.imageUrl,
                      Title: movie.title,
                      Description: movie.description,
                      Genre: {
                          name: movie.genre.name,
                          description: movie.genre.subgenre
                      },
                      Director: {
                          name: movie.director.Name,
                          bio: movie.director.Bio,
                          Birth: movie.director.Birth,
                          Death: movie.director.Death
                      },
                      Featured: movie.featured
                  }
              });
              if (moviesFromAPI.length === 0) {
                  return <div className="main-view">The list is empty!</div>;
              }

              setMovies(moviesFromAPI);
          });
  }, []);


  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
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