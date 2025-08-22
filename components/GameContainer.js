import React from "react";

function GameContainer({ items, catchItem }) {
  return (
    <div className="relative w-full max-w-lg h-[350px] sm:h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-400">
      {items.map((item) => (
        <div
          key={item.id}
          onClick={() => catchItem(item.id, item.symbol)}
          className={`absolute text-5xl sm:text-6xl cursor-pointer select-none animate-fall transition-transform duration-200 hover:scale-125 ${
            item.symbol === "💣" ? "text-red-600" : ""
          }`}
          style={{ left: `${item.x}%`, top: 0 }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
}

export default GameContainer;
