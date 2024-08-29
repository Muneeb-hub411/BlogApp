import mongoose from "mongoose";
import UserModel from "../models/UserModel.js";
import BlogModel from "../models/BlogModel.js";
// import cloudinary from "../utils/cloudinary.js";

export const createBlogController = async (req, res) => {
  const { title, description, image, user } = req.body;
  try {
    // const result = await cloudinary.uploader.upload(image, {
    //   folder: "blogapp",
    // });
    //validation
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide ALl Fields",
      });
    }
    const exisitingUser = await UserModel.findById(user);
    //validaton
    if (!exisitingUser) {
      return res.status(404).send({
        success: false,
        message: "unable to find user",
      });
    }

    const newBlog = new BlogModel({
      title,
      description,
      // image: {
      //   public_id: result.public_id,
      //   url: result.secure_url,
      // },
      image,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newBlog.save({ session });
    exisitingUser.blog.push(newBlog);
    await exisitingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();
    return res.status(201).send({
      success: true,
      message: "Blog Created!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error WHile Creting blog",
      error,
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
