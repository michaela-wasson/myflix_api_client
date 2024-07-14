import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import {Link} from "react-router-dom";

//import "./movie-card.scss"

export const MovieCard = ({ movie }) => {
    const directorName = movie.Director ? movie.Director.Name : "no name"; 
    return (
      <Card className= "h-100">
        <Card.Img variant="top" src={movie.ImagePath} width= {100} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>Director: {directorName}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
            </Link>
          
        </Card.Body>
      </Card>
    );
  };


   MovieCard.propTypes = {
     movie: PropTypes.shape({
       Title: PropTypes.string,
       ImagePath: PropTypes.string
     }).isRequired

   };