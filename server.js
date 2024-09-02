import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import userRoute from "./Routes/userRoutes.js";
import blogRoutes from "./Routes/blogRoutes.js";
import fileUpload from "express-fileupload";

dotenv.config();
const app = express();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

connectDb();

app.use("/api/v1/auth", userRoute);

app.use("/api/v1/blog", blogRoutes);

app.get("/", (req, res) => {
  try {
    return res.status(200).send({
      message: "Website is running",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Problem in running website",
      error,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
