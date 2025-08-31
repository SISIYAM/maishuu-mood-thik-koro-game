import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Leaderboard({ onClose }) {
  const [players, setPlayers] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    try {
      const res = await fetch(`/api/leaderboard?page=${page}&limit=20`);
      const data = await res.json();
      if (data && data.length > 0) {
        setPlayers((prev) => {
          const newPlayers = [...prev, ...data];
          const uniquePlayers = Array.from(
            new Map(newPlayers.map((p) => [p._id, p])).values()
          );
          return uniquePlayers;
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, [page]);

  // Animations (simple slide-in, no fade looping)
  const cardAnim = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-6 rounded-2xl shadow-2xl border border-pink-200 bg-gradient-to-br from-pink-100 via-pink-200 to-pink-300 overflow-x-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 drop-shadow flex items-center gap-2">
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-bounce" />
          লিডারবোর্ড 🏆
        </h2>
        <button
          onClick={onClose}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-md text-sm sm:text-base"
        >
          বন্ধ করুন
        </button>
      </div>

      {/* Leaderboard Items */}
      <InfiniteScroll
        dataLength={players.length}
        next={() => setPage((prev) => prev + 1)}
        hasMore={hasMore}
        loader={
          <p className="text-center text-gray-700 py-4 animate-pulse">
            লোড হচ্ছে...
          </p>
        }
        className="flex flex-col gap-4"
      >
        {players.map((player, i) => {
          let extraClasses =
            "bg-white border border-pink-200 text-gray-900 shadow";
          let badge = null;

          if (i === 0) {
            // 1st place
            extraClasses =
              "bg-yellow-100 border-2 border-yellow-400 shadow-2xl relative mt-8";
            badge = (
              <Crown className="absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-500 drop-shadow animate-bounce" />
            );
          } else if (i === 1) {
            // 2nd place
            extraClasses =
              "bg-gray-100 border-2 border-gray-400 shadow-xl relative";
            badge = (
              <span className="absolute -top-3 right-3 bg-gray-400 text-white text-xs px-2 py-1 rounded-full shadow">
                🥈 2nd
              </span>
            );
          } else if (i === 2) {
            // 3rd place
            extraClasses =
              "bg-amber-100 border-2 border-amber-500 shadow-xl relative";
            badge = (
              <span className="absolute -top-3 right-3 bg-amber-600 text-white text-xs px-2 py-1 rounded-full shadow">
                🥉 3rd
              </span>
            );
          } else if (i < 10) {
            // Top 10
            extraClasses = "bg-pink-200/60 border-2 border-pink-400 shadow-lg";
          }

          return (
            <motion.div
              key={i}
              {...cardAnim}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${extraClasses} w-full`}
            >
              {badge}
              <div className="flex items-center gap-3 sm:gap-4 truncate">
                <span className="text-lg sm:text-xl font-bold text-pink-700 min-w-[40px]">
                  #{i + 1}
                </span>
                <span
                  className={`text-sm sm:text-lg font-semibold truncate max-w-[180px] sm:max-w-[300px] ${
                    i === 0 ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {player.name || "Unknown Player"}
                </span>
              </div>
              <span className="text-sm sm:text-lg font-bold text-pink-700">
                {player.highScore}
              </span>
            </motion.div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
