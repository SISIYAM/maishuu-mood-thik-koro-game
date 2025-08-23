import React, { useState } from "react";

export default function GameContainer({ items, catchItem }) {
  const [poppedItems, setPoppedItems] = useState([]);

  const handleClick = (id, symbol) => {
    // mark as popped
    setPoppedItems((prev) => [...prev, id]);

    // remove after pop animation
    setTimeout(() => {
      catchItem(id, symbol);
      setPoppedItems((prev) => prev.filter((i) => i !== id));
    }, 300);
  };

  return (
    <div className="relative w-full max-w-lg h-[350px] sm:h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-400">
      {items.map((item) => {
        const isPopped = poppedItems.includes(item.id);
        return (
          <div
            key={item.id}
            onClick={() => handleClick(item.id, item.symbol)}
            className={`absolute cursor-pointer select-none ${
              item.symbol === "💣" ? "text-red-600" : ""
            } animate-fall transition-transform duration-300 
            ${isPopped ? "scale-200 opacity-0" : "scale-100 opacity-100"} 
            hover:scale-150`}
            style={{
              left: `${item.x}%`,
              top: 0,
              fontSize: window.innerWidth < 640 ? "4rem" : "4rem",
              transformOrigin: "center center",
              animationDuration: `${item.duration}ms`,
            }}
          >
            {item.symbol}
          </div>
        );
      })}
    </div>
  );
}
