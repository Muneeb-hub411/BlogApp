const Navbar = () => {
  return (
    <div className="w-full h-20 bg-blue-500 flex justify-between p-4 fixed text-white text-3xl">
      <div>
        <h2 className="p-2 text-3xl font-semibold">Blog App</h2>
      </div>

      <ul className=" flex justify-between ">
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200 hidden">
          Blogs
        </li>
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200 hidden">
          My Blogs
        </li>
      </ul>

      <ul className=" flex justify-between">
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200">
          Login
        </li>
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200">
          Register
        </li>
        <li className="p-3 text-2xl font-oswald cursor-pointer  hover:scale-105 transition-transform duration-200">
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
