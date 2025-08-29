"use client";

import { getGlobalHighScore } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function GameOver({
  score,
  handleHappyEnd,
  restartGame,
  gameoverMessage,
  highScore,
}) {
  const [globalHighScore, setGlobalHighScore] = useState(0);

  useEffect(() => {
    const fetchGlobalHighScore = async () => {
      const res = await getGlobalHighScore();
      if (res && res.data && res.data.length > 0) {
        setGlobalHighScore(res.data[0].highScore);
      }
    };
    fetchGlobalHighScore();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center justify-center bg-gradient-to-br from-white via-pink-50 to-red-100 rounded-2xl shadow-2xl p-8 z-10 w-full max-w-md border border-pink-200"
    >
      {/* Title */}
      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-3xl font-extrabold text-red-500 mb-4 animate-bounce"
      >
        Game Over 😭
      </motion.h2>

      {/* Message */}
      <p className="text-lg mb-4 text-gray-700 text-center">
        {gameoverMessage}
      </p>

      {/* Scores */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center space-y-3"
      >
        <p className="text-xl font-medium text-gray-800">
          🎯 তুমি <span className="font-bold text-pink-600">{score}</span>{" "}
          পয়েন্ট পেয়েছ!
        </p>
        <p className="text-lg font-semibold text-gray-800">
          🏆 তোমার High Score:{" "}
          <span className="font-bold text-green-600">{highScore}</span>
        </p>

        {/* Global High Score with cool animation */}
        <motion.p
          animate={{
            scale: [1, 1.1, 1],
            color: ["#f43f5e", "#ec4899", "#f43f5e"],
            textShadow: [
              "0px 0px 5px #f43f5e",
              "0px 0px 15px #ec4899",
              "0px 0px 5px #f43f5e",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl font-extrabold mt-4"
        >
          🌍 Global High Score: {globalHighScore}
        </motion.p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6"
      >
        <button
          onClick={handleHappyEnd}
          className="cursor-pointer bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-3 rounded-xl shadow-lg w-full sm:w-auto transform transition-transform hover:scale-105"
        >
          হ্যাঁ মুড ভালো করেছি 😄
        </button>
        <button
          onClick={restartGame}
          className="cursor-pointer bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-5 py-3 rounded-xl shadow-lg w-full sm:w-auto transform transition-transform hover:scale-105"
        >
          না, এখনো হয়নি 😒
        </button>
      </motion.div>
    </motion.div>
  );
}

export default GameOver;
