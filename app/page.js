"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const rejectMessage =
  "কেনো খেলবা না? এত কষ্ট করেছি তোমার জন্য game বানিয়েছি, আর তুমি এমন করলা! হাইরে! 😠";

const funnyTexts = [
  "আমি জানি আমি একটু বোকা, তাও মুড ঠিক করো huh 😅",
  "Maishuuu, মুড অন না হলে আমি system format করব 🔥",
  "তুমি হাসলে আমার CG 4.00 হয়ে যায় frr 📚",
  "মুড ঠিক করো না হলে আমি infinite loop এ চলে যাব 🔁",
  "Maishuuu, মুড অফ থাকলে আমি stray cat হয়ে যাই 😼",
];

const gameMessages = [
  "তোমার mood off থাকলে আমি lazy cat হয়ে যাই 🐱",
  "তোমার mood ঠিক থাকলে আমার if condition true হয় 😎",
  "মুড ঠিক করো, catnip খাওয়া cat এর মতো happy হয়ে যাও 🐾",
  "মুড অফ থাকলে আমার code compile হয় না, শুধু error আসে 😫",
  "তোমার mood on থাকলে আমি recursion এর মতো হাসি repeat করি 😂",
  "মুড অফ থাকলে আমার happiness derivative zero হয়ে যায় 📉",
  "তোমার mood ঠিক থাকলে আমার function return করবে happy value ✅",
];

const happyEndMessages = [
  "ইয়েসস! মুড fix হয়ে গেছে Maishuuu! 😻",
  "এইবার হাসি upload করো! 😂",
  "Mood booster সফল 🚀",
  "Maishuuu = 100% Happy ❤️",
];

const objects = ["❤️", "💣", "🐱", "😻", "🌸", "🐾", "🍫", "🐶", "💕"];

export default function MoodGame() {
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [bottomText, setBottomText] = useState(funnyTexts[0]);
  const [missed, setMissed] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [happyEnd, setHappyEnd] = useState(false);
  const [funnyMsg, setFunnyMsg] = useState("");
  const [happyMessage, setHappyMessage] = useState(
    happyEndMessages[Math.floor(Math.random() * happyEndMessages.length)]
  );
  const [showFunnySection, setShowFunnySection] = useState(false);

  const intervalRef = useRef(null);

  // rotate bottom text
  useEffect(() => {
    const interval = setInterval(() => {
      setBottomText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // generate falling items
  useEffect(() => {
    if (gameOver || happyEnd) return;

    let intervalTime = 1000; // initial interval for item generation
    let fallDuration = 4000; // initial fall duration

    const generateItem = () => {
      const id = Date.now();
      const randomObject = objects[Math.floor(Math.random() * objects.length)];
      const x = Math.random() * 90;

      setItems((prev) => [
        ...prev,
        { id, x, symbol: randomObject, duration: fallDuration },
      ]);

      setTimeout(() => {
        setItems((prev) => {
          const item = prev.find((i) => i.id === id);
          if (item && item.symbol === "❤️") setMissed((m) => m + 1);
          return prev.filter((i) => i.id !== id);
        });
      }, fallDuration);
    };

    // function to continuously generate items and increase speed
    const interval = setInterval(() => {
      generateItem();

      // gradually increase speed
      if (intervalTime > 300) intervalTime -= 20; // decrease interval time
      if (fallDuration > 1500) fallDuration -= 50; // decrease fall duration
    }, intervalTime);

    return () => clearInterval(interval);
  }, [gameOver, happyEnd]);

  // game Over if too many misses
  useEffect(() => {
    if (missed >= 6) setGameOver(true);
  }, [missed]);

  // randomly change happy end message
  useEffect(() => {
    if (!happyEnd) return;
    const interval = setInterval(() => {
      setHappyMessage(
        happyEndMessages[Math.floor(Math.random() * happyEndMessages.length)]
      );
    }, 1500);
    return () => clearInterval(interval);
  }, [happyEnd]);

  const catchItem = (id, symbol) => {
    if (symbol === "💣") {
      setGameOver(true);
      return;
    }
    setScore((prev) => prev + 1);
    setMessage(gameMessages[Math.floor(Math.random() * gameMessages.length)]);
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const restartGame = () => {
    clearInterval(intervalRef.current);
    setGameOver(false);
    setHappyEnd(false);
    setScore(0);
    setMissed(0);
    setItems([]);
    setMessage("");
    setFunnyMsg("");
    setShowFunnySection(false);
  };

  const handleHappyEnd = () => {
    clearInterval(intervalRef.current);
    setGameOver(false);
    setHappyEnd(true);
    setItems([]);
    setMessage("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 text-center relative overflow-hidden px-2 md:px-0">
      {/* responsive top header */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow-lg animate-bounce mb-6 sm:mb-10">
        মুড ভালো করো Maishuuu 😻
      </h1>

      {gameOver ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-6 z-10 w-full max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4 animate-bounce">
            Game Over 😭
          </h2>
          <p className="text-lg mb-6 text-gray-700 animate-bounce">
            তুমি {score} পয়েন্ট পেয়েছ!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <button
              onClick={handleHappyEnd}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
            >
              হ্যাঁ মুড ভালো করেছি 😄
            </button>
            <button
              onClick={restartGame}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
            >
              না, এখনো হয়নি 😒
            </button>
          </div>
        </div>
      ) : happyEnd && !showFunnySection ? (
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-6 z-10 w-full max-w-md">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-4 animate-bounce">
            {happyMessage}
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center relative">
            <button
              onClick={restartGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto"
            >
              আবার খেলবো 😁
            </button>

            <button
              onClick={() => {
                setFunnyMsg(rejectMessage);
                setShowFunnySection(true);
              }}
              className="px-6 py-3 bg-red-400 text-white rounded-xl font-bold shadow-lg w-full sm:w-auto"
            >
              না আর খেলবো না 😒
            </button>
          </div>
        </div>
      ) : showFunnySection ? (
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
      ) : (
        <>
          <p className="text-xl mb-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg w-full max-w-md mx-auto">
            Score: <span className="font-bold">{score}</span> | Missed ❤️:{" "}
            {missed}
            /5
          </p>

          {message && (
            <p className="text-lg sm:text-xl font-semibold text-pink-900 mb-6 animate-bounce px-2">
              {message}
            </p>
          )}

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

          <div className="mt-4 w-full text-center overflow-hidden">
            <p className="text-2xl sm:text-3xl font-semibold text-pink-700 animate-marquee px-2">
              {bottomText}
            </p>
          </div>
        </>
      )}

      <style jsx>{`
        .animate-fall {
          animation: fall 4s linear forwards;
        }
        @keyframes fall {
          0% {
            top: 0;
            transform: rotate(0deg);
          }
          100% {
            top: 350px;
            transform: rotate(360deg);
          }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
