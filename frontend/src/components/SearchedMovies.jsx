import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import MovieCard from "../components/moviecard";
import { useNavigate } from "react-router-dom";

function SearchedMovies() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || ""); //always useState for searchbar
  const navigate = useNavigate();

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
      } catch (err) {
        console.log(err);
      }
    };

    loadPopularMovies();
  }, [searchQuery]);

  //using search in the same page

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div>
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full box-border">
        {movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
}

export default SearchedMovies;
