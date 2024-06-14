import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Eloquent Iris",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Iris_sanguinea.JPG/330px-Iris_sanguinea.JPG",
      description: "Art-House Film that consists of 90 minutes of watching an iris grow.",
      genre: "Thriller"
    },
    {
      id: 2,
      title: "The Silence in the Attic",
      image:
        "https://studyfinds.org/wp-content/uploads/2023/10/shutterstock_1151252645-scaled.jpg",
      description: "A small cat travels upstairs into the attic to hunt down and kill the scurrying mice.",
      genre: "Musical"
    },
    {
      id: 3,
      title: "Learning How to Write Code",
      image:
        "https://cdn.create.vista.com/api/media/small/247763998/stock-photo-attractive-businesswoman-sitting-table-laptop-typing-office",
      description: "A horror film that will keep you on the edge of your seat. Follow the trauma of the terrified student as she launches into api's and drowns in JavaScript.", 
      genre: "Thriller"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movie.length === 0) {
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