import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BlogCards from "../Components/BlogCards";

const Userblog = () => {
  const id = localStorage.getItem("userId");
  console.log("id :", id);
  const [blog, setBlog] = useState([]);

  const getUserBlog = async () => {
    try {
      const res = await axios.get(`/api/v1/blog/user-blog/${id}`);
      console.log(res.data.blogs);

      if (res?.data.success) {
        if (res.data.blogs.length === 0) {
          toast.error("You don't have any blogs");
        } else {
          setBlog(res?.data.blogs);
        }
      } else {
        toast.error("Failed to retrieve blogs");
      }
    } catch (error) {
      toast.error("Error in getting user blog");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-3 p-10">
        {blog &&
          blog.map((blogs) => (
            <BlogCards
              key={blogs?._id}
              image={blogs?.image}
              title={blogs?.title}
              description={blogs?.description}
            />
          ))}
      </div>
    </>
  );
};

export default Userblog;
