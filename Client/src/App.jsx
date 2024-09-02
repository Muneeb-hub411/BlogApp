import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import Userblog from "./pages/Userblog";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/user-blog" element={<Userblog />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
