import {
  getLeaderboard,
  updateScore,
  getFullLeaderboard,
} from "../../controllers/leaderboardController";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  // check if user wants full leaderboard
  const full = searchParams.get("full");

  if (full === "true") {
    const { status, data } = await getFullLeaderboard();
    return Response.json(data, { status });
  }

  // default → top 10 leaderboard
  const { status, data } = await getLeaderboard();
  return Response.json(data, { status });
}

export async function POST(req) {
  const { userId, score } = await req.json();
  const { status, data } = await updateScore(userId, score);
  return Response.json(data, { status });
}
