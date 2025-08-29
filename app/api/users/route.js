import { connectDB } from "@/lib/mongodb";
import { signup, login } from "../../controllers/authController";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    const { action } = body;

    if (action === "signup") {
      const { status, data } = await signup(body);
      return Response.json(data, { status });
    }

    if (action === "login") {
      const { status, data } = await login(body);
      return Response.json(data, { status });
    }

    return Response.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
