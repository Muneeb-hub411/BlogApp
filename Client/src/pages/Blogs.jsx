import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import BlogCards from "../Components/BlogCards";

const Blogs = () => {
  const [blog, setBlog] = useState([]);
  const getAllBlog = async () => {
    try {
      const res = await axios.get("/api/v1/blog/all-blog");
      console.log(res.data.blog);
      if (res?.data.success) {
        setBlog(res?.data.blog);
        console.log(blog);
      }
    } catch (error) {
      toast.error("error in getting all blog");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  return (
    <>
      <div className="grid sm:grid-cols-3 gap-3 p-10 ">
        {blog &&
          blog.map((blogs) => (
            <BlogCards
              key={blogs?._id}
              image={
                "https://media.istockphoto.com/id/887987150/photo/blogging-woman-reading-blog.jpg?b=1&s=612x612&w=0&k=20&c=9PyipVek-UL7ECf1tpy0uIRnbajme4W4qoJkJKYczUU="
              }
              title={blogs?.title}
              description={blogs?.description}
            />
          ))}
      </div>
    </>
  );
};

export default Blogs;
