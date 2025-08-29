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
        setPlayers((prev) => [...prev, ...data]);
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

  // Animations
  const top3Animation = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 0.98, opacity: 1 },
    transition: { type: "spring", stiffness: 200, damping: 15 },
  };

  const top10Animation = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.4 },
  };

  const othersAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.2 },
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
          let animProps = othersAnimation;
          let extraClasses = "bg-white border border-pink-200 text-gray-900";

          if (i < 3) {
            animProps = top3Animation;
            extraClasses =
              "bg-yellow-100 border-2 border-yellow-400 shadow-xl animate-pulse text-gray-900";
          } else if (i < 10) {
            animProps = top10Animation;
            extraClasses =
              "bg-pink-200 border-2 border-pink-400 shadow-lg text-gray-900";
          }

          return (
            <motion.div
              key={i}
              initial={animProps.initial}
              animate={animProps.animate}
              transition={animProps.transition}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${extraClasses} w-full`}
            >
              <div className="flex items-center gap-3 sm:gap-4 truncate">
                <span className="text-lg sm:text-xl font-bold text-pink-700 min-w-[40px]">
                  #{i + 1}
                </span>
                <span className="text-sm sm:text-lg font-semibold truncate max-w-[180px] sm:max-w-[300px]">
                  {player.name || "Unknown Player"}
                </span>
              </div>
              <span className="text-sm sm:text-lg font-bold text-pink-700">
                {player.score}
              </span>
            </motion.div>
          );
        })}
      </InfiniteScroll>
    </div>
  );
}
