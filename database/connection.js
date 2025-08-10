import mongoose from "mongoose";

const connectToDB = async () => {
  const MONGO_URL = process.env.MONGO_URL;

  if (!MONGO_URL) {
    throw new Error("❌ MONGO_URL is not defined in environment variables");
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ MongoDB Connected!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    throw error;
  }
};

export default connectToDB;
