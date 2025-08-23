import { motion } from "framer-motion";
import React from "react";

function Instruction({ setGameStarted }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-gradient-to-br from-pink-100 to-pink-200 shadow-xl rounded-2xl p-6 max-w-lg w-full text-center border border-pink-300"
    >
      {/* Animated Heading */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="flex justify-center items-center gap-2 mb-2">
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-3xl"
          >
            ❤️
          </motion.span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-pink-700">
            হেই Maishuu!
          </h2>
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="text-3xl"
          >
            ❤️
          </motion.span>
        </div>
        <p className="text-pink-600 font-semibold text-sm">
          এই গেমটি শুধুই Maishuuu এর জন্য, মুড ঠিক করার জন্য! huh frr 😻
        </p>
      </div>

      {/* Game Instructions */}
      <ul className="text-left text-gray-800 mb-6 space-y-3 text-lg font-medium">
        <li className="flex items-center gap-2">
          <span className="text-red-500 text-xl">❤️</span> ধরলে{" "}
          <b className="text-green-700">+5 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-pink-500 text-xl">🌹</span> ধরলে{" "}
          <b className="text-green-700">+10 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-green-600 text-xl">🐸</span> ধরলে{" "}
          <b className="text-red-600">-1 পয়েন্ট</b>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-black text-xl">💣</span> ধরলে{" "}
          <b className="text-red-700">গেম ওভার!</b>
        </li>
        <li className="flex items-center gap-2">
          ❤️ <b className="text-red-600">১০ বার মিস করলে → গেম ওভার</b>
        </li>
      </ul>

      {/* How to Play */}
      <div className="bg-pink-200 p-3 rounded-lg shadow-inner mb-6">
        <p className="text-pink-800 text-lg font-semibold">👉 কিভাবে খেলবে?</p>
        <p className="text-gray-700 font-medium">
          স্ক্রিনে যেসব চিহ্ন (❤️, 🌹, 🐱, 😻, 🌸, 🐾, 🍫, 🐶, 🐸, 💣) পড়বে,
          সেগুলোর উপর <span className="text-pink-700 font-bold">ক্লিক করো</span>
          ! <br />
          <span className="text-sm text-gray-600">দ্রুত ধরতে হবে! 😉</span>
        </p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-6 mt-4">
        <motion.button
          onClick={() => setGameStarted(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="cursor-pointer bg-pink-600 hover:bg-pink-700 text-white font-bold text-lg px-8 py-3 rounded-full shadow-lg"
        >
          Start Game 🥺
        </motion.button>

        <motion.button
          animate={{ x: 0, y: 0 }}
          whileHover={{
            x: [0, 80, -60, 100, -40, 0],
            y: [0, -40, 50, -30, 40, 0],
            transition: { duration: 2, ease: "easeInOut" },
          }}
          whileTap={{
            scale: 0.9,
            rotate: [0, 10, -10, 0],
            transition: { duration: 0.8 },
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="cursor-pointer bg-gray-400 text-white font-bold text-lg px-8 py-3 rounded-full shadow-md"
        >
          খেলবো না 😭
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Instruction;
