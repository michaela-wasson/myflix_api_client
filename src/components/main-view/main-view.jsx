import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import {LoginView} from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";

export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);   

  


  useEffect(() => {
    if(!token) {
      return;
    }
      

    fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/movies",{
      //method:"GET",
      headers: {
        Authorization: 'Bearer ${token}'
      },
      //body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const moviesFromAPI = data.map(movie => {

              const genre = movie.genre ? {
                Description: movie.genre.description,
                Name: movie.genre.name
            } : { Description: "", Name: "" }; 

                const director = movie.director ? {
                    Name: movie.director.Name,
                    Bio: movie.director.Bio,
                    Birth: movie.director.Birth,
                    Death: movie.director.Death
                } : { Name: "", Bio: "", Birth: "", Death: "" }; 

                return {
                    _id: movie._id,
                    ImageUrl: movie.imageUrl,
                    Title: movie.title,
                    Description: movie.description,
                    Genre: genre,
                    Director: director,
                    Featured: movie.featured
                }
            });

            setMovies(moviesFromAPI);

        });

  }, [token]);


  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }
  

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }
  
  if (moviesFromAPI.length === 0) {
    return <div className="main-view">The list is empty!</div>;
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

  <button onClick={() => { setUser(null); setToken(null); localStorage.clear; }}>Logout</button>
};