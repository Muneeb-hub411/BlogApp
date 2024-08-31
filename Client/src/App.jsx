import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      {" "}
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/register" element={<Register />} />

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
