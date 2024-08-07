import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import {ProfileView} from "../profile-view/profile-view";
import {LoginView} from "../login-view/login-view";
import {SignupView} from "../signup-view/signup-view";
import {ProfileEdit} from "../profile-view/profile-edit-view";
import {NavBar} from "../navigation-bar/navigation-bar"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);   

  const [searchItem, setSearchItem] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const emptySearch = () => {
    setSearchItem("");
  };

  useEffect(() => {
    if (searchItem === "") {
      setFilteredMovies(movies);
    } else {
      const filteredList = movies.filter((movie) => {
        return movie.Title.toLowerCase().includes(searchItem.toLowerCase());
      });
      setFilteredMovies(filteredList);
    }
  }, [searchItem, movies]);
  


  useEffect(() => {
    if(!token) {
      return;
    }
      

    fetch("https://movieapi2020-67bf919e3b74.herokuapp.com/movies",{
      
      headers: {
        Authorization: `Bearer ${token}`
      },
      
    })
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            const moviesFromAPI = data.map(movie => {

                return {
                    _id: movie._id,
                    ImagePath: movie.ImagePath,
                    Title: movie.Title,
                    Description: movie.Description,
                    Director: {
                      Name: movie.Director.Name,
                      Bio: movie.Director.Bio,
                      Birth: movie.Director.Birth,
                      Death: movie.Director.Death,
                    },
                    Genre: {
                      Name: movie.Genre.Name,
                      Description: movie.Genre.Description,
                    },
                    Featured: movie.Featured
                }
            });
            //console.log("moviesfromAPI" , moviesFromAPI)
            setMovies(moviesFromAPI);
            //console.log("movies", movies)

        });

  }, [token]);


  return (
    <BrowserRouter>
    <NavBar user={storedUser} onLoggedOut={() => { setUser(null); setToken(null); localStorage.clear(); }} 
      emptySearch={emptySearch}
      handleInputChange={handleInputChange}
      searchItem={searchItem}
      />
    <Row className="justify-content-md-center">
      <Routes>
        <Route
        path= "/signup"
        element={
          <>
          {user ? (
            <Navigate to = "/" />
          ): (
            <Col md={5}>
              <SignupView/>
            </Col>
          )}
          </>
        }
        />

        <Route 
        path= "/login"
        element= {
          <>
            {user ? (
              <Navigate to= "/"/>
            ): (
              <Col md={5}>
                <LoginView onLoggedIn= {(user) => setUser(user)}/>
              </Col>
            )}
          </>

        }
        />

        <Route 
        path= "/movies/:movieId"
        element={
          <>
          { ! user ? (
            <Navigate to ="/login" replace />
          ) : movies.length === 0 ? (
            <Col> There are no movies! </Col>
          ) : (
            <Col md={9} >
              <MovieView movies={movies} />
            </Col>
          )}
          </>
        }
        />

        <Route 
        path= "/users"
        element= {
          <>
            {! user ? (
              <Navigate to= "/login" replace/>
            ): (
              <Col md={5}>
                <ProfileView 
                movies={movies}
                onLoggedIn= {(user) => setUser(user)}/>
              </Col>
            )}
          </>

        }
        />

        <Route 
        path= "/users/ProfileEdit"
        element= {
          <>
            {! user ? (
              <Navigate to= "/login" replace/>
            ): (
              <Col md={5}>
                <ProfileEdit onLoggedIn= {(user) => setUser(user)}/>
              </Col>
            )}
          </>

        }
        />

        <Route 
        path = "/"
        element = {
          <>
            {! user ? (
              <Navigate to="/login" replace/>
            ): movies.length === 0? (
              <Col> There are no movies!</Col>
            ) : (
              <>
                {filteredMovies.map ((movie) => (
                  <Col className= "mb-4" 
                  key= {movie._id} 
                  md={3}> 
                  <MovieCard movie={movie}/>
                  </Col>
                ))}
                </>
              )}
            </>
}
/>
</Routes>

</Row>
    </BrowserRouter>
  );
};



 