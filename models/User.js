import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  highScore: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  timestamps: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
