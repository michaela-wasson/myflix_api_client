import {useState, useEffect} from "react";
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = localStorage.getItem('token');
 
  const { movieId } = useParams();
  
  const movie = movies.find((mov) => mov._id === movieId);
  const favMovies = (movies || []).filter(m => user && user.FavoriteMovies && user.FavoriteMovies.includes(m._id));
  const [isFavorited, setIsFavorited] = useState('');
  const [addMovieTitle, setAddMovieTitle] = useState('');
  const [removeMovieTitle, setRemoveMovieTitle] = useState('');

  

  useEffect(() => {
    if (user && user.FavoriteMovies && movie) {
      const isMovieFavorited = favMovies.some(m => m._id === movie._id);
      setIsFavorited(isMovieFavorited);
      //isFavorite = true;
    } else {
      setIsFavorited(false);
    }
  }, [user, movie, favMovies]);

  const updateFavoritesInLocalStorage = (updatedFavorites) => {
    const updatedUser = { ...user, FavoriteMovies: updatedFavorites };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };
  


  const favorite = async () => {
    try {
      const response = await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}/${movieId}`, {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const updated = { ...user, FavoriteMovies: data.FavoriteMovies }; 
      localStorage.setItem("user", JSON.stringify(updated));
      setIsFavorited(true);
      alert("Movie added");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add movie: " + error.message);
    }
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    setAddMovieTitle(movie.Title);
    favorite();
  }
  

  
  const deleteFavorite = async () => {
    try {
      const response = await fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      const data = await response.json();
      updateFavoritesInLocalStorage(data.FavoriteMovies);
      setIsFavorited(false);
      alert("Movie removed from favorites");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to remove movie: " + error.message);
    }
  };

  const handleDeleteFavorite = (e) => {
    e.preventDefault();
    setRemoveMovieTitle(movie.Title);
    deleteFavorite();
  }

  console.log(user)


  
  


    return (
<Row className ="justify-content-md-center"> 
        <Col>
        <div>
          <img className="rounded w-100 h-100" src={movie.ImagePath}/>
        </div>
        </Col>
        
        <Col>
        <div className = "movie-card-element">
          <span><strong>Title:</strong> </span>
          <span>{movie.Title}</span>
        </div>
        <div className = "movie-card-element">
          <span><strong>Description:</strong> </span>
          <span>{movie.Description}</span>
        </div>
        <div className = "movie-card-element">
        <span><strong>Genre:</strong> </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div className= "movie-card-element">
          <span><strong>Genre Described: </strong></span>
          <span>{movie.Genre.Description}</span>
        </div>
        <div className = "movie-card-element">
          <span><strong>Director:</strong> </span>
          <span>{movie.Director.Bio}</span>
        </div>

        <Link to={`/`}>
        <button className="button">Back</button>
        </Link>

        
        {!isFavorited ? (
          <button className= "button" onClick={handleFavorite}>Add to Favorites</button>
        ) : (
          <button className= "button" onClick={handleDeleteFavorite}>Delete from Favorites</button>
        )}
        

        </Col>
</Row>
      
    );
  };