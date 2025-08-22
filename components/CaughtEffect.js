import { motion } from "framer-motion";
import React from "react";

function CaughtEffect({ caughtEffect }) {
  return (
    <motion.div
      key={caughtEffect.id}
      initial={{ scale: 0, opacity: 0, y: 0 }}
      animate={{
        scale:
          caughtEffect.type === "bomb"
            ? 2.5
            : caughtEffect.points >= 10
            ? 2.2
            : caughtEffect.points > 0
            ? 1.8
            : 1.6,
        opacity: 1,
        y: caughtEffect.type === "bomb" ? -150 : -100,
        rotate:
          caughtEffect.type === "negative"
            ? [0, -10, 10, -5, 5, 0]
            : [0, 5, -5, 5, -5, 0],
        color:
          caughtEffect.type === "bomb"
            ? "#8B0000"
            : caughtEffect.points === 10
            ? "#C7007F"
            : caughtEffect.points === 5
            ? "#006400"
            : caughtEffect.points === -1
            ? "#8B0000"
            : "#000000",
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
        y: { type: "tween", duration: 0.8 },
        scale: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="absolute top-36 left-1/2 -translate-x-1/2 font-extrabold text-7xl sm:text-8xl md:text-9xl pointer-events-none z-50"
    >
      {caughtEffect.type === "bomb"
        ? "💥"
        : caughtEffect.points > 0
        ? `+${caughtEffect.points}`
        : `${caughtEffect.points}`}
    </motion.div>
  );
}

export default CaughtEffect;
