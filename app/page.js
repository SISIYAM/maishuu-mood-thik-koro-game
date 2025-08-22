"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import GameOver from "@/components/GameOver";
import HappyEnd from "@/components/HappyEnd";
import FunnySection from "@/components/FunnySection";
import GameContainer from "@/components/GameContainer";
import "./style.css";

const rejectMessage =
  "কেনো খেলবা না? এত কষ্ট করেছি তোমার জন্য game বানিয়েছি, আর তুমি এমন করলা! হাইরে! 😠";

const funnyTexts = [
  "আমি জানি আমি একটু বলদ, তাও মুড ঠিক করো huh frr :( 😓",
  "Maishuuu, মুড অন না হলে আমি system format করব 🔥",
  "মুড ঠিক করো না হলে আমি শেষ frrr 😖🔁",
  "Maishuuu, মুড অফ থাকলে আমি stray cat হয়ে যাই huh :(😼",
];

const gameMessages = [
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
  "তোমার mood off থাকলে আমি lazy cat হয়ে যাই 🐱",
  "তুমি আমার ছোট্ট মিউ মিউ 😻 frr sweet XD",
  "তোমার mood off থাকলে life boring হয়ে যায় 😴",

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

const happyEndMessages = [
  "ইয়েসস! মুড fix হয়ে গেছে Maishuuu! :) 😻",
  "এইবার হাসি upload করো! frrr XD XD 😂",
  "Mood booster সফল huh XD XD🚀",
  "Maishuuu = 100% Happy yeeeey ^_^ ❤️",
];

const objects = ["❤️", "💣", "🐱", "😻", "🌸", "🐾", "🍫", "🐶", "🐸", "🌹"];

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
  const [caughtEffect, setCaughtEffect] = useState(null);

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

    // initial interval for item generation
    let intervalTime = 1000;
    // initial fall duration
    let fallDuration = 4000;

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
    if (missed >= 10) setGameOver(true);
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
    setItems((prev) => prev.filter((item) => item.id !== id));

    let points = 0;
    let type = "positive";

    switch (symbol) {
      case "❤️":
        points = 5;
        type = "positive";
        setScore((prev) => prev + points);
        break;
      case "🌹":
        points = 10;
        type = "positive";
        setScore((prev) => prev + points);
        break;
      case "🐸":
        points = -1;
        type = "negative";
        setScore((prev) => (prev + points >= 0 ? prev + points : 0));
        break;
      case "💣":
        type = "bomb";
        points = 0;
        break;
      default:
        points = 1;
        type = "positive";
        setScore((prev) => prev + points);
    }

    setMessage(
      symbol === "💣"
        ? "💥 বোম্ব! হুহ, গেম শেষ হবে... 😭"
        : gameMessages[Math.floor(Math.random() * gameMessages.length)]
    );

    // set caughtEffect only once
    setCaughtEffect({ type, points });

    // remove effect after animation duration
    setTimeout(() => {
      setCaughtEffect(null);
      // trigger gameOver after bomb animation
      if (type === "bomb") {
        setGameOver(true);
        setMessage("💥 বোম্ব! গেম শেষ, মুড ঠিক হয়নি?? :((");
      }
    }, 800);
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
        <GameOver
          score={score}
          handleHappyEnd={handleHappyEnd}
          restartGame={restartGame}
          gameoverMessage={message}
        />
      ) : happyEnd && !showFunnySection ? (
        <HappyEnd
          happyMessage={happyMessage}
          restartGame={restartGame}
          setFunnyMsg={setFunnyMsg}
          setShowFunnySection={setShowFunnySection}
        />
      ) : showFunnySection ? (
        <FunnySection funnyMsg={funnyMsg} restartGame={restartGame} />
      ) : (
        <>
          {/* Game Instructions / Disclaimer */}
          <div className="mb-4 w-full max-w-md mx-auto bg-pink-50 border-2 border-pink-200 rounded-xl p-3 text-center shadow-md">
            <p className="text-pink-700 font-medium text-sm sm:text-base">
              🎮 কিভাবে খেলতে হবে: ❤️ ক্যাচ করো, 🐱 ক্যাচ করো এবং 💣 বোম্ব
              এড়াও। <br />
              ⚠️ যদি 10টি হারাও বা বোম্ব ধরো, গেম ওভার হবে। <br />
              😻 মজা করো, Maishuuu এর মুড ঠিক করো!
            </p>
          </div>
          <p className="text-xl mb-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg w-full max-w-md mx-auto">
            Score: <span className="font-bold">{score}</span> | Missed ❤️:{" "}
            {missed}
            /10
          </p>

          {message && (
            <p className="text-lg sm:text-xl font-semibold text-pink-900 mb-6 animate-bounce px-2">
              {message}
            </p>
          )}

          <GameContainer items={items} catchItem={catchItem} />
          {caughtEffect && (
            <motion.div
              key={Date.now()}
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
              className="absolute top-20 left-1/2 -translate-x-1/2 font-extrabold text-7xl sm:text-8xl md:text-9xl pointer-events-none z-50"
            >
              {caughtEffect.type === "bomb"
                ? "💥"
                : caughtEffect.points > 0
                ? `+${caughtEffect.points}`
                : `${caughtEffect.points}`}
            </motion.div>
          )}

          <div className="mt-4 w-full text-center overflow-hidden">
            <p className="text-2xl sm:text-3xl font-semibold text-pink-700 animate-marquee px-2">
              {bottomText}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
