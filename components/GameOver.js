import { getGlobalHighScore } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

function GameOver({
  score,
  handleHappyEnd,
  restartGame,
  gameoverMessage,
  highScore,
  user,
  setOnViewLeaderboard,
}) {
  const [globalHighScore, setGlobalHighScore] = useState(0);
  const [globalHighScorerId, setGlobalHighScorerId] = useState("");

  useEffect(() => {
    const fetchGlobalHighScore = async () => {
      const res = await getGlobalHighScore();
      console.log("Fetched global high score:", res);

      if (res && res.highScore !== undefined) {
        setGlobalHighScore(res.highScore);
        setGlobalHighScorerId(res.userId);
        console.log("Global High Score set:", res.highScore);
      }
    };

    fetchGlobalHighScore();
  }, [score]);

  const isCurrentUserHighScorer = user?._id === globalHighScorerId;

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 via-white to-green-50 rounded-2xl shadow-2xl p-8 z-10 w-full max-w-md border border-gray-200"
    >
      {/* Game Over Title */}
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-extrabold text-red-500 mb-3"
      >
        Game Over 😭
      </motion.h2>

      {/* Message */}
      <p className="text-lg mb-4 text-gray-700 text-center">
        {gameoverMessage}
      </p>

      {/* Score */}
      <motion.p
        initial={{ scale: 0.9 }}
        animate={{ scale: 1.05 }}
        transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        className="text-lg mb-3 font-medium text-gray-800"
      >
        তুমি <span className="font-bold text-pink-600">{score}</span> পয়েন্ট
        পেয়েছ!
      </motion.p>

      {/* Personal High Score */}
      <p className="text-lg mb-4 font-semibold text-gray-800">
        🎯 High Score:{" "}
        <span className="font-bold text-green-600">{highScore}</span>
      </p>

      {/* Global High Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`bg-yellow-100 border-2 rounded-xl px-5 py-3 mb-6 flex items-center gap-3 shadow-inner ${
          isCurrentUserHighScorer
            ? "border-green-500 bg-green-100"
            : "border-yellow-400"
        }`}
      >
        <Crown
          className={`w-6 h-6 animate-bounce ${
            isCurrentUserHighScorer ? "text-green-600" : "text-yellow-600"
          }`}
        />
        <p
          className={`text-lg font-bold ${
            isCurrentUserHighScorer ? "text-green-700" : "text-yellow-700"
          }`}
        >
          🌍 Global High Score:{" "}
          <motion.span
            animate={
              isCurrentUserHighScorer
                ? { scale: [1, 1.3, 1] }
                : { scale: [1, 1.2, 1] }
            }
            transition={{ repeat: Infinity, duration: 1.2 }}
            className={
              isCurrentUserHighScorer ? "text-red-500" : "text-red-600"
            }
          >
            {globalHighScore}
          </motion.span>
          {isCurrentUserHighScorer && " 🎉 You!"}
        </p>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <button
          onClick={handleHappyEnd}
          className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto transition"
        >
          হ্যাঁ মুড ভালো করেছি 😄
        </button>
        <button
          onClick={restartGame}
          className="cursor-pointer bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto transition"
        >
          না, এখনো হয়নি 😒
        </button>
      </div>

      {/* Leaderboard Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOnViewLeaderboard(true)}
        className="mt-6 w-full sm:w-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-5 py-2 rounded-lg shadow-lg flex items-center justify-center gap-2"
      >
        <Crown className="w-5 h-5" /> পুরো লিডারবোর্ড দেখুন 🏆
      </motion.button>
    </motion.div>
  );
}

export default GameOver;
