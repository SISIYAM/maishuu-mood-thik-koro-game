"use client";
import { useEffect, useState } from "react";
const funnyTexts = [
  "মুড ভালো করো Maishuuu 😻",
  "আমি জানি আমি একটু বোকা, তাও মুড ঠিক করো huh 😅",
  "Maishuuu, মুড অন না হলে আমি system format করব 🔥",
  "তুমি হাসলে আমার CG 4.00 হয়ে যায় frr 📚",
  "মুড ঠিক করো না হলে আমি infinite loop এ চলে যাব 🔁",
];
const messages = [
  "তোমার mood off থাকলে আমি stray cat হয়ে যাই huh 😼",
  "তোমার mood off থাকলে আমি মিউ মিউ error দেখাই 😹",
  "মুড অফ থাকলে cat mode চালু করো না, debug হবে huh frr 😂",
  "মুড ঠিক করো, catnip খাওয়া cat এর মতো happy হয়ে যাও 🐾",
  "তোমার mood off থাকলে আমি lazy cat হয়ে যাই 🐱",
  "তোমার mood off থাকলে আমার life null pointer exception হয়ে যায় huh 💥",
  "তোমার mood ঠিক থাকলে আমার if condition true হয় 😎",
  "তোমার mood off থাকলে আমার happiness variable initialize হয় না frr 🤯",
  "মুড অফ থাকলে আমার code compile হয় না, শুধু error আসে 😫",

  "তুমি না থাকলে আমার brain update নেয় না huh frr 🤯",
  "তুমি cat mode চালু করেছ নাকি? 😼",
  "তুমি আমার battery saver mode 😂",
  "একটু হাসো, না হলে uninstall করে দিব huh 😎",
  "তুমি ভালো থাকলে headache download হয় না 🤕",
  "তোমার জন্য একটা free gift – হাসি! 🎁",
  "তোমার মুড অফ থাকলে আমি loading screen এ আটকে যাই huh⏳",
  "কিছু না, শুধু mood update করো! huh frrr 🔄",
  "এভাবে মুড অফ করে থাকলে app crash হয়ে যাবে 🤖",
  "তুমি আমার antivirus – bad mood delete করো huh 🦠",
  "তুমি মুড অফ করে থাকলে আমি Google এ ‘হাসির shortcut’ search করি 😆",
  "এভাবে মুড অফ করে থাকলে আমার মুড airplane mode এ চলে যায় ✈️",
  "এমনে মুড অফ করে থাকলে আমি কিছুই করতে পারি না huh 😩",
  "এমনে মুড অফ করে থাকলে হবে না হুহ, মুড অন করো! 🔄",
  "তুমি না থাকলে আমি lazy cat হয়ে যেতাম 🐱",
  "তুমি আমার ছোট্ট মিউ মিউ 😻",
  "তুমি না থাকলে life boring হতো 😴",

  "তোমার mood ঠিক করলে আমার function return করবে ‘happy’ value ✅",
  "তোমার mood on হলে আমি recursion এর মতো হাসি repeat করি 😂",
  "মুড অফ থাকলে আমার algorithm complexity O(∞) হয়ে যায় huh frr 🔄",
  "তোমার mood off থাকলে আমার life equation unsolvable হয়ে যায় 😩",
  "তোমার mood on থাকলে সবকিছু integrate হয়ে যায় 🧮",
  "মুড অফ থাকলে আমার happiness derivative zero হয়ে যায় 📉",
  "তোমার mood on হলে আমার CG calculation perfect square হয় huh frr 🤓",
  "তোমার mood off থাকলে আমি probation এ চলে যাব huh 😭",
  "মুড ঠিক থাকলে আমার life easy A+, না হলে F grade huh 😩",
  "মুড অফ থাকলে আমি supplement এর মতো দুঃখী হয়ে যাই huh 😂",
  "মুড ঠিক করো নাহলে আমি তোমার উপর debug চালাব 😈",
  "তোমার mood off থাকলে আমি system format করে দিব huh 🔥",
  "তোমার mood on থাকলে আমি infinite loop এ হাসি হাহা 😂",
];

const objects = ["❤️", "🐱", "😻", "🌸", "🐾", "🍫", "🐶", "💕"];

export default function Home() {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [topText, setTopText] = useState(funnyTexts[0]);

  // Rotate top text every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setTopText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Generate falling items (hearts + cats + cute emojis)
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      const randomObject = objects[Math.floor(Math.random() * objects.length)];
      setItems((prev) => [
        ...prev,
        { id, x: Math.random() * 90, symbol: randomObject },
      ]);
      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== id));
      }, 4000);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const catchItem = (id) => {
    setScore(score + 1);
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-pink-100 to-pink-300 text-center relative overflow-hidden">
      {/* Animated Top Text */}
      <h2 className="absolute top-6 text-2xl font-bold text-pink-800 animate-pulse drop-shadow-lg">
        {topText}
      </h2>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-pink-600 mb-3 drop-shadow-lg">
        Catch the Love & Cats 🐾
      </h1>
      <p className="text-lg font-medium text-pink-700 mb-6 italic">
        Mood Fixer for Maishuuu ❤️
      </p>

      {/* Score */}
      <p className="text-xl mb-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2 rounded-full shadow-lg">
        Score: <span className="font-bold">{score}</span>
      </p>

      {/* Funny message after catch */}
      {message && (
        <p className="text-xl font-semibold text-pink-900 mb-6 animate-bounce">
          {message}
        </p>
      )}

      {/* Game Area */}
      <div className="relative w-full max-w-lg h-[400px] bg-white rounded-2xl shadow-2xl overflow-hidden border-4 border-pink-400">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => catchItem(item.id)}
            className="absolute text-4xl cursor-pointer animate-fall select-none"
            style={{
              left: `${item.x}%`,
              top: 0,
            }}
          >
            {item.symbol}
          </div>
        ))}
      </div>

      {/* Styles for falling animation */}
      <style jsx>{`
        .animate-fall {
          animation: fall 4s linear forwards;
        }
        @keyframes fall {
          from {
            top: 0;
            transform: rotate(0deg);
          }
          to {
            top: 350px;
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
