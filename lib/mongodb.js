import mongoose from "mongoose";
// global variable to track connection
let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("✅ Using existing database connection");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("🚀 MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}
