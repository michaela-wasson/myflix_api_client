import Image from 'react-bootstrap/Image';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const { movieId } = useParams();
  console.log("movieId", movieId)
  const movie = movies.find((mov) => mov._id === movieId);
  const favMovies = (movies || []).filter(m => (user.FavoriteMovies || []).includes(m._id));
  
  


  const favorite = (movie) => { 
    //const newFavmovies= [...favMovies, movie];
    //favMovies = newFavMovies;
    favMovies.push(movie);
    alert("Movie added")

  };

  
  const deleteFavorite = (movie) => {
    favMovies.remove(movie);
    alert("${movie} deleted.")
    
  }


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

        
        <button onClick= {favorite}>Add to Favorites</button>
        

        
        <button onClick= {deleteFavorite}>Delete from Favorites</button>
        

        </Col>
</Row>
      
    );
  };