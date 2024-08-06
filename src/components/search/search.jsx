

export const Search = (props) => {

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


    return (
      <>
      <form>
        <input
          placeholder="Search for..."
          onChange={(event)=>props.callback(event.target.value)}
        />
      </form>
      </>
    )}