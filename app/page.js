"use client";
import { useEffect, useState, useRef } from "react";
import GameOver from "@/components/GameOver";
import HappyEnd from "@/components/HappyEnd";
import FunnySection from "@/components/FunnySection";
import GameContainer from "@/components/GameContainer";
import "./style.css";
import CaughtEffect from "@/components/CaughtEffect";
import Instruction from "@/components/Instruction";
import FloatingHeart from "@/components/FloatingHeart";

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
  const [gameStarted, setGameStarted] = useState(false);
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
  const [effectId, setEffectId] = useState(0);

  const intervalRef = useRef(null);

  // Sounds using Audio API
  const catchSound = useRef(null);
  const bombSound = useRef(null);
  const clickSound = useRef(null);
  const bgmSound = useRef(null);

  useEffect(() => {
    // Initialize sounds
    catchSound.current = new Audio("/sounds/catch.mp3");
    bombSound.current = new Audio("/sounds/bomb.mp3");
    clickSound.current = new Audio("/sounds/click.mp3");
    bgmSound.current = new Audio("/sounds/bgm-1.mp3");
    allTimeBgmSound.current = new Audio("/sounds/bgm-2.mp3");
    bgmSound.current.loop = true;
    bgmSound.current.volume = 0.1;
  }, []);

  // rotate bottom text
  useEffect(() => {
    const interval = setInterval(() => {
      setBottomText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // generate falling items
  useEffect(() => {
    if (gameOver || happyEnd || !gameStarted) return;

    // start bgm
    if (bgmSound.current) bgmSound.current.play();

    let intervalTime = 1000;
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

    const interval = setInterval(() => {
      generateItem();
      if (intervalTime > 300) intervalTime -= 20;
      if (fallDuration > 1500) fallDuration -= 50;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [gameOver, happyEnd, gameStarted]);

  useEffect(() => {
    if (missed >= 10) setGameOver(true);
  }, [missed]);

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
        setScore((prev) => prev + points);
        catchSound.current?.play();
        break;
      case "🌹":
        points = 10;
        setScore((prev) => prev + points);
        catchSound.current?.play();
        break;
      case "🐸":
        points = -1;
        type = "negative";
        setScore((prev) => (prev + points >= 0 ? prev + points : 0));
        clickSound.current?.play();
        break;
      case "💣":
        type = "bomb";
        points = 0;
        bombSound.current?.play();
        break;
      default:
        points = 1;
        setScore((prev) => prev + points);
        catchSound.current?.play();
    }

    setMessage(
      symbol === "💣"
        ? "💥 বোম্ব! হুহ, গেম শেষ হবে... 😭"
        : gameMessages[Math.floor(Math.random() * gameMessages.length)]
    );

    setEffectId((prev) => prev + 1);
    setCaughtEffect({ id: effectId + 1, type, points });

    setTimeout(() => {
      setCaughtEffect(null);
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
    setGameStarted(false);
    setScore(0);
    setMissed(0);
    setItems([]);
    setMessage("");
    setFunnyMsg("");
    setShowFunnySection(false);

    // stop bgm
    bgmSound.current?.pause();
    bgmSound.current.currentTime = 0;
  };

  const handleHappyEnd = () => {
    clearInterval(intervalRef.current);
    setGameOver(false);
    setHappyEnd(true);
    setItems([]);
    setMessage("");

    // stop bgm
    bgmSound.current?.pause();
    bgmSound.current.currentTime = 0;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 text-center relative overflow-hidden px-2 md:px-0">
      <h1 className="credit-glow text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow-lg animate-bounce mb-6 sm:mb-10">
        মুড ভালো করো Maishuuu 😻
      </h1>

      {!gameStarted && !gameOver && !happyEnd ? (
        <>
          <Instruction setGameStarted={setGameStarted} />
          <FloatingHeart />
        </>
      ) : gameOver ? (
        <>
          <GameOver
            score={score}
            handleHappyEnd={handleHappyEnd}
            restartGame={restartGame}
            gameoverMessage={message}
          />
          <FloatingHeart />
        </>
      ) : happyEnd && !showFunnySection ? (
        <>
          <HappyEnd
            happyMessage={happyMessage}
            restartGame={restartGame}
            setFunnyMsg={setFunnyMsg}
            setShowFunnySection={setShowFunnySection}
          />
          <FloatingHeart />
        </>
      ) : showFunnySection ? (
        <>
          <FunnySection funnyMsg={funnyMsg} restartGame={restartGame} />
          <FloatingHeart />
        </>
      ) : (
        <>
          <p className="text-xl mb-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full shadow-lg w-full max-w-md mx-auto">
            Score: <span className="font-bold">{score}</span> | Missed ❤️:{" "}
            {missed}/10
          </p>
          {message && (
            <p className="text-lg sm:text-xl font-semibold text-pink-900 mb-6 animate-bounce px-2">
              {message}
            </p>
          )}
          <GameContainer items={items} catchItem={catchItem} />
          {caughtEffect && <CaughtEffect caughtEffect={caughtEffect} />}
          <div className="mt-4 w-full text-center overflow-hidden">
            <p className="text-2xl sm:text-3xl font-semibold text-pink-700 animate-marquee px-2">
              {bottomText}
            </p>
          </div>
        </>
      )}
      <div className="absolute bottom-4 w-full text-center">
        <p className="credit-glow text-pink-700 text-lg font-bold animate-pulse">
          💖 This game is made only for you Maishuu to fix your mood ^_^ 💖
        </p>
      </div>
    </div>
  );
}
