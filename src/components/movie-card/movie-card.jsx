import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };



  MovieCard.propTypes = {
    movie: PropType.shape({
        title: PropType.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.arrayOf(PropTypes.object),
        Director: PropTypes.arrayOf(PropTypes.object),
        imageUrl: PropType.string.isRequired,
        Featured: PropTypes.bool
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};