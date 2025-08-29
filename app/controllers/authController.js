import User from "@/models/User";
import bcrypt from "bcryptjs";

export const signup = async ({ name, email, password }) => {
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return { status: 201, data: user };
  } catch (error) {
    return { status: 400, data: { error: "Signup failed" } };
  }
};

export const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, data: { error: "User not found" } };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { status: 401, data: { error: "Invalid credentials" } };
    }

    return { status: 200, data: user };
  } catch (error) {
    return { status: 400, data: { error: "Login failed" } };
  }
};
