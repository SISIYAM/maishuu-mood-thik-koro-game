import {
  getLeaderboard,
  updateScore,
} from "../../controllers/leaderboardController";

export async function GET() {
  const { status, data } = await getLeaderboard();
  return Response.json(data, { status });
}

export async function POST(req) {
  const { userId, score } = await req.json();
  const { status, data } = await updateScore(userId, score);
  return Response.json(data, { status });
}
