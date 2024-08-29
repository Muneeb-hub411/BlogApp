import express from "express";
import {
  UserRegController,
  UserLoginController,
  AllUserController,
} from "../controller/userController.js";

const router = express.Router();

router.post("/register", UserRegController);
router.post("/login", UserLoginController);
router.get("/all-user", AllUserController);

export default router;
