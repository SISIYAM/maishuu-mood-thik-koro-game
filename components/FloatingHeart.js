import { motion } from "framer-motion";
import React from "react";

function FloatingHeart() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(10)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-pink-400 text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "-50px",
          }}
          animate={{
            y: ["0%", "-120vh"],
            opacity: [0.8, 1, 0],
          }}
          transition={{
            duration: Math.random() * 6 + 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

export default FloatingHeart;
