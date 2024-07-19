import {useState, useEffect} from "react";
import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const token = JSON.stringify(localStorage.getItem('token')); 
  const { movieId } = useParams();
  console.log("movieId", movieId)
  const movie = movies.find((mov) => mov._id === movieId);
  const favMovies = (movies || []).filter(m => (user.FavoriteMovies || []).includes(m._id));
  const [isFavorited, setIsFavorited] = useState(false);
  const [addMovieTitle, setAddMovieTitle] = useState('');
  const [removeMovieTitle, setRemoveMovieTitle] = useState('');

  
  


  const favorite = async () => {
    setIsFavorited(false);
    isFavorite= false;
    fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}/${movieId}`, {
      method: "POST",
      body: JSON.stringify(movie),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    
      },
    })
    .then((response) => response.json())
    .then((response) => {
      const updated = { ...user, favMovies: response.favMovies }; 
      localStorage.setItem("user", JSON.stringify(updated));
      setIsFavorited(true);
      isFavorite= true;
      alert("Movie added");
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to add movie" + error.message);
    });

    setIsFavorited(true);
    isFavorite = true;
    
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    setAddMovieTitle(movie.Title);
  }
  

  
  const deleteFavorite = async () => {
    setIsFavorited(true);
    isFavorite = true;

    fetch(`https://movieapi2020-67bf919e3b74.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      body: JSON.stringify(movie),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
    .then((response) => response.json())
    .then((res) => {
      const updated = { ...user, favoriteMovies: user.favoriteMovies.filter((m) => m !== movie._id) }; 
      localStorage.setItem("user", JSON.stringify(updated));
      setIsFavorited(false);
      isFavorite = false;
      alert("Movie deleted");
      window.location.reload()
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Failed to delete movie");
    });

    setIsFavorited(false);
    isFavorite = false;
  };

  const handleDeleteFavorite = (e) => {
    e.preventDefault();
    setRemoveMovieTitle(movie.Title);
  }

  useEffect(() => {
    if (user && movie) {
      setIsFavorited(user.favMovies.includes(movie._id));
      isFavorite = true;
    } else {
      setIsFavorited(false);
      isFavorite = false;
    }
  }, [user, movie, user]);
  
  


    return (
<Row className ="justify-content-md-center"> 
        <Col>
        <div>
          <img className="rounded w-100 h-100" src={movie.ImagePath}/>
        </div>
        </Col>
        
        <Col>
        <div>
          <span>Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div>
          <span>Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div>
        <span>Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div>
          <span>Genre Explained: </span>
          <span>{movie.Genre.Description}</span>
        </div>
        <div>
          <span>Director: </span>
          <span>{movie.Director.Bio}</span>
        </div>

        <Link to={`/`}>
        <button className="back-button">Back</button>
        </Link>

        
        <button onClick= {handleFavorite}>Add to Favorites</button>
        

        
        <button onClick= {handleDeleteFavorite}>Delete from Favorites</button>
        

        </Col>
</Row>
      
    );
  };