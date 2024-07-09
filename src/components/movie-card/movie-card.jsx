import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card>
        <Card.Img variant="top" src={movie.ImagePath} width= {100}/>
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.director}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  };


  MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string,
      ImagePath: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };