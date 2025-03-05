import MovieCard from "../components/moviecard";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api";
import { useNavigate } from "react-router-dom";
function Home() {
  const [searchQuery, setSearchQuery] = useState(""); //always useState for searchbar
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed to Load Movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); //to keep the text in the searchbar
    // if(!searchQuery.trim()) return 
    // if(loading) return

    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  }

    // setLoading(true) //indicating loading
    // try{
    //   const searchResults = await searchMovies(searchQuery)
    //   setMovies(searchResults)
    //   setError(null)

    // }catch(err){
    //   console.log(err)
    //   setError("FAiled to load movies...")

    // }
    // finally{
    //   setLoading(false)
    // }

    // setSearchQuery("")
  };

  return (
    <div className="w-full box-border py-8 sm:py-4">
       
      <form
        onSubmit={handleSearch}
        className="max-w-2xl mx-auto mb-8 flex gap-4 px-4 box-border sm:mb-4"
        action=""
      >
        <input
          type="text"
          placeholder="Search for movies..."
          className="flex-1 p-3 bg-gray-800 text-white rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-red-600 text-white rounded-md font-medium transition-colors duration-200 hover:bg-red-700 whitespace-nowrap"
        >
          Search
        </button>
      </form>

      {error && <div className="error-message"> {error} </div>} 
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full box-border">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
