import { Link } from "react-router-dom";
function NavBar() {
  // const handleClick = () => {
  //   navigate("/");
  //   window.location.reload();
  // };
  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-md w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/">Movie App</Link>
        <Link to="/">Home </Link>
        <Link to="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}
export default NavBar;
