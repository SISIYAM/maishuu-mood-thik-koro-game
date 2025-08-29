import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

export async function getUsers() {
  await connectDB();
  try {
    const users = await User.find();
    return { status: 200, data: users };
  } catch (error) {
    return { status: 500, data: { error: "Failed to fetch users" } };
  }
}

export async function createUser(req) {
  await connectDB();
  try {
    const { name, email, password } = await req.json();
    const newUser = new User({ name, email, password });
    await newUser.save();
    return { status: 201, data: newUser };
  } catch (error) {
    return { status: 400, data: { error: "Error creating user" } };
  }
}
