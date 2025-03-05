import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/moviecard";

function Favorite() {
  const { favorites } = useMovieContext();

  if (favorites) {
    return (
      <div className="justify-center">
          <h2 className="text-center font-bold text-3xl p-4">Your Favorites</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 w-full box-border">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="favorites-empty">
      <h2>Np favorite movies yet</h2>
      <p>Start adding movies to your fav and it will appear here</p>
    </div>
  );
}

export default Favorite;
