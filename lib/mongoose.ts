import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  console.log(process.env.MONGODB_URL);
  mongoose.set("strict", true);

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL is not set");
  }

  if (isConnected) {
    return console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devoverflow",
    });
    isConnected = true;
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.log("Error connecting to MongoDB", error);
  }
};
