import { motion } from "framer-motion";
import React from "react";

function FunnySection({ funnyMsg, restartGame }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-3xl shadow-3xl p-8 z-10 w-full max-w-3xl mt-8">
      {funnyMsg && (
        <motion.p
          className="text-red-700 font-bold mb-6 text-center px-6 py-4 bg-gradient-to-r from-pink-200 to-pink-400 rounded-xl shadow-lg text-lg sm:text-xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {funnyMsg}
        </motion.p>
      )}

      <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full justify-center relative">
        <button
          onClick={restartGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-xl text-lg font-semibold w-full sm:w-auto transition-transform duration-200 hover:scale-105"
        >
          আচ্ছা খেলবো 😁
        </button>

        <motion.button
          whileHover={{
            x: Math.random() * 120 - 60,
            y: Math.random() * 60 - 30,
          }}
          whileTap={{
            x: Math.random() * 120 - 60,
            y: Math.random() * 60 - 30,
          }}
          className="px-6 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-xl cursor-not-allowed text-lg w-full sm:w-auto"
        >
          না এখনও খেলবো না 😒
        </motion.button>
      </div>
    </div>
  );
}

export default FunnySection;
