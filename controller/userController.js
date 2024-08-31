import UserModel from "../models/UserModel.js";
import bcrypt, { hash } from "bcrypt";

export const UserRegController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Field is missing",
      });
    }
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "user already exist",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await new UserModel({
      name,
      email,
      password: hashPassword,
    }).save();
    return res.status(200).send({
      success: true,
      message: "User Registered",
      user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Register",
      error,
    });
  }
};

export const UserLoginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send({
      success: false,
      mesaage: "Email or Password is missing",
    });
  }

  const User = await UserModel.findOne({ email });
  if (!User) {
    return res.status(400).send({
      success: false,
      message: "User doesnt exist kindly register first",
    });
  }

  const comparepass = await bcrypt.compare(password, User.password);
  if (!comparepass) {
    return res.status(400).send({
      success: false,
      message: "email or password is incorrect",
    });
  }

  return res.status(200).send({
    success: true,
    message: "User logged in successfully",
    User,
  });
};

export const AllUserController = async (req, res) => {
  try {
    const user = await UserModel.find({});
    return res.status(200).send({
      success: true,
      message: "All User",
      user,
      total_user: user.length,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error,
      message: "Error in fetching all users",
    });
  }
};
