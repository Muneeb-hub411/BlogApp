import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URL);

    console.log(`Database is connected at host: ${con.connection.host}`);
  } catch (error) {
    console.log("erro in DB :", error);
  }
};
