import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function updateScore(userId, score) {
  await connectDB();
  try {
    const user = await User.findById(userId);
    if (!user) return { status: 404, data: { error: "User not found" } };

    if (score > user.highScore) {
      user.highScore = score;
      await user.save();
    }

    return { status: 200, data: { highScore: user.highScore } };
  } catch (error) {
    return { status: 400, data: { error: "Failed to update score" } };
  }
}

export async function getLeaderboard() {
  await connectDB();
  try {
    const leaderboard = await User.find({}, "_id name highScore")
      .sort({ highScore: -1 })
      .limit(10);

    return { status: 200, data: leaderboard };
  } catch (error) {
    return { status: 500, data: { error: "Failed to fetch leaderboard" } };
  }
}

export async function getFullLeaderboard(page = 1, limit = 20) {
  await connectDB();
  try {
    const skip = (page - 1) * limit;
    const leaderboard = await User.find({}, "_id name highScore")
      .sort({ highScore: -1 })
      .skip(skip)
      .limit(limit);

    return { status: 200, data: leaderboard };
  } catch (error) {
    return { status: 500, data: { error: "Failed to fetch leaderboard" } };
  }
}
