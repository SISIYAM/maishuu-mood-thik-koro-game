"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: isSignup ? "signup" : "login",
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && !data.error) {
        setSuccess(true);
        console.log("✅ Response:", data);

        localStorage.setItem("user", JSON.stringify(data));
        onLogin(data);
      } else {
        console.warn("❌ API Error:", data);
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      setError("Network error, please try again");
      console.error("⚠️ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-pink-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full max-w-sm bg-white shadow-xl rounded-2xl p-8 border border-pink-200"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-6">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <AnimatePresence>
            {isSignup && (
              <motion.input
                key="nameInput"
                type="text"
                placeholder="Name"
                className="w-full p-3 rounded-lg border border-pink-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              />
            )}
          </AnimatePresence>

          <motion.input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg border border-pink-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg border border-pink-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            whileFocus={{ scale: 1.02 }}
          />

          <motion.button
            type="submit"
            className="cursor-pointer w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
            whileTap={{ scale: 0.95 }}
            disabled={loading}
          >
            {loading ? "Processing..." : isSignup ? "Sign Up" : "Login"}
          </motion.button>
        </form>

        {/* Success Message */}
        <AnimatePresence>
          {success && (
            <motion.p
              key="success"
              className="text-green-600 text-center mt-3 font-semibold"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              🎉 Login Successful!
            </motion.p>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.p
              key="error"
              className="text-red-500 text-center mt-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ⚠️ {error}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            type="button"
            className="cursor-pointer text-pink-600 font-semibold hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>
      </motion.div>
    </motion.div>
  );
}
