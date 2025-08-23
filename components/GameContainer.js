import React from "react";
export default function GameContainer({ items, catchItem }) {
  return (
    <div className="relative w-full max-w-lg h-[350px] sm:h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-400">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => catchItem(item.id, item.symbol)}
          className={`absolute text-5xl sm:text-6xl cursor-pointer select-none ${
            item.symbol === "💣" ? "text-red-600" : ""
          } animate-fall`}
          style={{
            left: `${item.x}%`,
            animationDuration: `${item.duration}ms`,
            top: 0,
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
}
