import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BlogCards from "../Components/BlogCards";

const Userblog = () => {
  const id = localStorage.getItem("userId");
  const [blog, setBlog] = useState([]);
  const getUserBlog = async () => {
    try {
      const res = await axios.get(`/api/v1/blog/user-blog/${id}`);
      console.log(res.data.blog);
      if (res?.data.success) {
        setBlog(res?.data.blog);
        console.log(blog);
      }
    } catch (error) {
      toast.error("error in getting user blog");
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlog();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-3 p-10 ">
        {blog &&
          blog.map(
            (blogs) => (
              console.log(blogs?.image),
              (
                <BlogCards
                  key={blogs?._id}
                  image={blogs?.image}
                  title={blogs?.title}
                  description={blogs?.description}
                />
              )
            )
          )}
      </div>
    </>
  );
};

export default Userblog;
