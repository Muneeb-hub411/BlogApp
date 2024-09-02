import express from "express";
import {
  createBlogController,
  GetAllBlogController,
  GetSingleBlogController,
  updateBlogController,
  deleteBlogController,
  userBlogControlller,
} from "../controller/blogController.js";

const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog", GetAllBlogController);

//POST || create blog
router.post("/create-blog", createBlogController);

//PUT || update blog
router.put("/update-blog/:id", updateBlogController);

//GET || SIngle Blog Details
router.get("/get-blog/:id", GetSingleBlogController);

// //DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", userBlogControlller);
export default router;
