import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import React from "react";

function Instruction({
  setGameStarted,
  highScore,
  setOnViewLeaderboard,
  topThree = [],
  currentUserId,
  globalHighScore,
  isCurrentUserHighScorer,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-pink-100 to-pink-200 shadow-lg rounded-xl p-4 sm:p-5 max-w-md w-full text-center border border-pink-300"
    >
      {/* Animated Heading */}
      <div className="flex flex-col items-center gap-1 mb-3">
        <div className="flex justify-center items-center gap-1 mb-1">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-2xl"
          >
            ❤️
          </motion.span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-pink-700">
            হেই Maishuu!
          </h2>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-2xl"
          >
            ❤️
          </motion.span>
        </div>
        <p className="text-pink-600 font-semibold text-xs">
          এই গেমটি শুধুই Maishuuu এর জন্য! 😻
        </p>
      </div>

      {/* Game Instructions */}
      <ul className="text-left text-gray-800 mb-4 space-y-2 text-sm font-medium">
        <li className="flex items-center gap-1">
          <span className="text-red-500 text-lg">❤️</span> ধরলে{" "}
          <b className="text-green-700">+5 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-1">
          <span className="text-pink-500 text-lg">🌹</span> ধরলে{" "}
          <b className="text-green-700">+10 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-1">
          <span className="text-green-600 text-lg">🐸</span> ধরলে{" "}
          <b className="text-red-600">-1 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-1">
          <span className="text-green-600 text-lg">🐾</span> ধরলে{" "}
          <b className="text-red-600">-6 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-1">
          <span className="text-black text-lg">💣</span> ধরলে{" "}
          <b className="text-red-700">গেম ওভার!</b>
        </li>

        <li className="flex items-center gap-1 text-xs">
          ❤️ <b className="text-red-600">১০ বার মিস করলে → গেম ওভার</b>
        </li>
        <li className="flex items-center gap-1 text-xs">
          🌹 <b className="text-red-600">৮ বার মিস করলে → গেম ওভার</b>
        </li>
      </ul>

      {/* How to Play */}
      <div className="bg-pink-200 p-2 rounded-lg shadow-inner mb-4">
        <p className="text-pink-800 text-sm font-semibold">👉 কিভাবে খেলবে?</p>
        <p className="text-gray-700 text-xs font-medium leading-snug">
          স্ক্রিনে যেসব চিহ্ন পড়বে, সেগুলোর উপর{" "}
          <span className="text-pink-700 font-bold">ক্লিক করো</span>! <br />
          <span className="text-gray-600">দ্রুত ধরতে হবে! 😉</span>
        </p>
      </div>

      {/* High Score */}
      <p className="text-lg mb-4 font-semibold text-gray-800 text-center mt-4">
        High Score: <span className="font-bold">{highScore}</span>
      </p>

      {/* Top 3 Leaderboard */}

      <div className="flex flex-col gap-3 mb-6">
        {topThree.map((player, idx) => {
          const isCurrentUser = player.userId === currentUserId;
          return (
            <motion.div
              key={player._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className={`border-2 rounded-xl px-5 py-3 flex items-center justify-between shadow-inner
          ${
            isCurrentUser
              ? "border-green-500 bg-green-100"
              : "border-yellow-400 bg-yellow-100"
          }
        `}
            >
              {/* Rank + Name */}
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-800 text-lg">
                  #{idx + 1}
                </span>
                <p
                  className={`font-semibold text-base ${
                    isCurrentUser ? "text-green-700" : "text-yellow-700"
                  }`}
                >
                  {player.userName || "Unknown"}
                  {isCurrentUser && " 👑 You!"}
                </p>
              </div>

              {/* Score */}
              <motion.span
                animate={
                  isCurrentUser
                    ? { scale: [1, 1.2, 1] }
                    : { scale: [1, 1.1, 1] }
                }
                transition={{ repeat: Infinity, duration: 1.2 }}
                className={`font-bold text-lg ${
                  isCurrentUser ? "text-red-500" : "text-red-600"
                }`}
              >
                {player.highScore}
              </motion.span>
            </motion.div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mt-3">
        <motion.button
          onClick={() => setGameStarted(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold text-base px-6 py-2 rounded-full shadow-md"
        >
          Start Game 🥺
        </motion.button>

        <motion.button
          onClick={() => setOnViewLeaderboard(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white font-bold text-base px-6 py-2 rounded-full shadow-md"
        >
          View Leaderboard 🏆
        </motion.button>

        <motion.button
          animate={{ x: 0, y: 0 }}
          whileHover={{
            x: [0, 60, -40, 80, -20, 0],
            y: [0, -20, 30, -20, 20, 0],
            transition: { duration: 2, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.9,
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.8 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="cursor-pointer bg-gray-400 text-white font-bold text-base px-6 py-2 rounded-full shadow-md"
        >
          খেলবো না 😭
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Instruction;
