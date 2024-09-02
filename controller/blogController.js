import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";
import cloudinary from "../utils/cloudinaryConfig.js";

export const createBlogController = async (req, res) => {
  const { title, description, user } = req.body;
  const file = req.files?.image;

  // Debugging log
  console.log("File upload info:", file);
  console.log("file tmep:", file.tempFilePath);

  // Validation check
  if (!title || !description || !user || !file) {
    return res.status(400).send({
      success: false,
      message: "Please provide all fields including the image",
    });
  }

  try {
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath);

    console.log("result is :", result);

    const existingUser = await UserModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user",
      });
    }

    const newBlog = new BlogModel({
      title,
      description,
      image: result.url,
      user,
    });

    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    existingUser.blog.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while creating blog",
      error: error.message,
    });
  }
};

export const GetAllBlogController = async (req, res) => {
  try {
    const blog = await BlogModel.find({}).populate("user");
    if (blog.length === 0) {
      return res.status(400).send({
        success: false,
        message: "No blog found",
      });
    }
    return res.status(200).send({
      success: true,
      blog,
      blogcount: blog.lenght,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,

      message: "error in getting all blog",
    });
  }
};
export const GetSingleBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await BlogModel.findById(id).populate("user");
    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "blog not found",
      });
    }
    return res.status(200).send({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in getting blog",
    });
  }
};

export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const blog = await BlogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in updating blog",
      error,
    });
  }
};

export const deleteBlogController = async (req, res) => {
  try {
    const blog = await BlogModel.findByIdAndDelete(req.params.id).populate(
      "user"
    );
    if (blog) {
      await blog.user.blog.pull(blog);
      await blog.user.save();
      return res.status(200).send({
        success: true,
        message: "blog deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in deleting blog",
    });
  }
};

export const userBlogControlller = async (req, res) => {
  try {
    const blog = await UserModel.findById(req.params.id).populate("blog");
    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "no blog found",
      });
    }
    return res.status(200).send({
      success: true,
      blogs: blog.blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in finding blog",
    });
  }
};
