import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className="w-full h-20 bg-blue-500 flex justify-between p-4  text-white text-3xl">
      <div>
        <h2 className="p-2 text-3xl font-semibold">Blog App</h2>
      </div>
      {isLoggedIn && (
        <ul className=" flex justify-between ">
          <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200 ">
            Blogs
          </li>
          <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200 ">
            My Blogs
          </li>
        </ul>
      )}

      <ul className=" flex justify-between">
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200">
          <Link to="/login">Login</Link>
        </li>
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200">
          <Link to="/register"> Register</Link>
        </li>
        {isLoggedIn && (
          <li
            onClick={handleLogout}
            className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200"
          >
            Logout
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
