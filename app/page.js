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
import {
  funnyTexts,
  gameMessages,
  getTopThreeLeaderboard,
  happyEndMessages,
  loveMessages,
  setLeaderboard,
} from "@/utils/utils";
import LoginForm from "@/components/LoginForm";
import Leaderboard from "@/components/Leaderboard";

const objects = ["❤️", "💣", "🐱", "😻", "🌸", "🐾", "🍫", "🐶", "🐸", "🌹"];

export default function MoodGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [items, setItems] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");
  const [bottomText, setBottomText] = useState(funnyTexts[0]);
  const [missed, setMissed] = useState({ heart: 0, rose: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [happyEnd, setHappyEnd] = useState(false);
  const [funnyMsg, setFunnyMsg] = useState("");
  const [happyMessage, setHappyMessage] = useState(
    happyEndMessages[Math.floor(Math.random() * happyEndMessages.length)]
  );
  const [showFunnySection, setShowFunnySection] = useState(false);
  const [caughtEffect, setCaughtEffect] = useState(null);
  const [effectId, setEffectId] = useState(0);

  const [userInteracted, setUserInteracted] = useState(false);
  const [loveMessage, setLoveMessage] = useState(
    loveMessages[Math.floor(Math.random() * loveMessages.length)]
  );
  const [onViewLeaderboard, setOnViewLeaderboard] = useState(false);
  const [topThree, setTopThree] = useState([]);

  // user login
  const [user, setUser] = useState(null);
  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (userInteracted) return;
    const interval = setInterval(() => {
      setLoveMessage(
        loveMessages[Math.floor(Math.random() * loveMessages.length)]
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== "undefined") {
      return parseInt(localStorage.getItem("highScore")) || 0;
    }
    return 0;
  });

  const intervalRef = useRef(null);
  const fallDurationRef = useRef(4000);

  // Web Audio API refs
  const audioContext = useRef(null);
  const bgmGain = useRef(null);
  const sfxGain = useRef(null);

  // store loaded audio buffers
  const audioBuffers = useRef({});

  useEffect(() => {
    audioContext.current = new (window.AudioContext ||
      window.webkitAudioContext)();

    // Gain nodes
    bgmGain.current = audioContext.current.createGain();
    sfxGain.current = audioContext.current.createGain();

    bgmGain.current.gain.value = 0.1; // BGM low
    sfxGain.current.gain.value = 1; // SFX high

    bgmGain.current.connect(audioContext.current.destination);
    sfxGain.current.connect(audioContext.current.destination);

    // Load all audio files
    const audioFiles = {
      catch: "/sounds/catch.mp3",
      bomb: "/sounds/bomb.mp3",
      click: "/sounds/click.mp3",
      heart: "/sounds/catch-2.mp3",
      rose: "/sounds/catch-4.mp3",
      bgm: "/sounds/bgm-1.mp3",
      allTimeBgm: "/sounds/bgm-2.mp3",
    };

    const loadAudio = async (name, url) => {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = await audioContext.current.decodeAudioData(arrayBuffer);
      audioBuffers.current[name] = buffer;
    };

    Promise.all(
      Object.entries(audioFiles).map(([name, url]) => loadAudio(name, url))
    ).catch(console.error);
  }, []);

  // function to play any sound
  const playSound = (name, loop = false) => {
    if (!audioBuffers.current[name]) return;

    const source = audioContext.current.createBufferSource();
    source.buffer = audioBuffers.current[name];

    // connect to correct gain
    if (name === "bgm" || name === "allTimeBgm") {
      source.loop = loop;
      source.connect(bgmGain.current);
      source.start(0);
      if (loop) bgmGain.current.currentSource = source;
    } else {
      source.connect(sfxGain.current);
      source.start(0);
    }
  };

  // handle switching music
  useEffect(() => {
    if (gameStarted) {
      if (bgmGain.current.currentSource) bgmGain.current.currentSource.stop();
      playSound("bgm", true);
    } else {
      if (!happyEnd && !gameOver) {
        if (bgmGain.current.currentSource) bgmGain.current.currentSource.stop();
        playSound("allTimeBgm", true);
      }
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameOver || happyEnd) {
      if (bgmGain.current.currentSource) bgmGain.current.currentSource.stop();
      playSound("allTimeBgm", true);
    }
  }, [gameOver, happyEnd]);

  // rotate bottom text
  useEffect(() => {
    const interval = setInterval(() => {
      setBottomText(funnyTexts[Math.floor(Math.random() * funnyTexts.length)]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (gameOver || happyEnd || !gameStarted) return;

    let intervalTime = 1000;

    const generateItem = () => {
      const id = Date.now();
      const randomObject = objects[Math.floor(Math.random() * objects.length)];
      const x = Math.random() * 90;

      setItems((prev) => [
        ...prev,
        { id, x, symbol: randomObject, duration: fallDurationRef.current },
      ]);

      setTimeout(() => {
        setItems((prev) => {
          const item = prev.find((i) => i.id === id);
          if (!item) return prev;
          if (item.symbol === "❤️")
            setMissed((m) => ({ ...m, heart: m.heart + 1 }));
          if (item.symbol === "🌹")
            setMissed((m) => ({ ...m, rose: m.rose + 1 }));
          return prev.filter((i) => i.id !== id);
        });
      }, fallDurationRef.current);
    };

    const interval = setInterval(() => {
      generateItem();
      if (intervalTime > 300) intervalTime -= 20;
      if (fallDurationRef.current > 1500) fallDurationRef.current -= 50;
    }, intervalTime);

    return () => clearInterval(interval);
  }, [gameOver, happyEnd, gameStarted]);

  useEffect(() => {
    if (missed.heart >= 10 && missed.rose >= 8) setGameOver(true);
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
        playSound("heart");
        break;
      case "🌹":
        points = 10;
        playSound("rose");
        break;
      case "🐸":
        points = -1;
        type = "negative";
        playSound("click");
        break;
      case "🐾":
        points = -6;
        type = "negative";
        playSound("click");
        break;
      case "💣":
        type = "bomb";
        points = 0;
        playSound("bomb");
        break;
      default:
        points = 1;
        playSound("catch");
    }

    setScore((prevScore) => {
      const newScore =
        points < 0 ? Math.max(0, prevScore + points) : prevScore + points;

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore);
        // update on server
        setLeaderboard(user._id, newScore);
      }

      return newScore;
    });

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
    setMissed({ heart: 0, rose: 0 });
    setItems([]);
    setMessage("");
    setFunnyMsg("");
    setShowFunnySection(false);

    if (bgmGain.current.currentSource) bgmGain.current.currentSource.stop();
    playSound("allTimeBgm", true);
  };

  const handleHappyEnd = () => {
    clearInterval(intervalRef.current);
    setGameOver(false);
    setHappyEnd(true);
    setItems([]);
    setMessage("");

    if (bgmGain.current.currentSource) bgmGain.current.currentSource.stop();
    playSound("allTimeBgm", true);
  };

  // Get top 3 users

  useEffect(() => {
    const fetchTopThree = async () => {
      const players = await getTopThreeLeaderboard();
      setTopThree(players);
    };
    fetchTopThree();
  }, [score]);

  if (!user) {
    return (
      <div className="w-full h-screen bg-white flex flex-col justify-center p-8">
        <LoginForm onLogin={setUser} />
      </div>
    );
  }

  // leaderboard
  if (onViewLeaderboard) {
    return (
      <div className="w-full h-screen bg-gradient-to-br from-pink-100 to-pink-200 flex flex-col justify-center p-8">
        <Leaderboard
          onClose={() => setOnViewLeaderboard(false)}
          currentUserId={user._id}
        />
      </div>
    );
  }

  // Overlay to capture first tap/click
  if (!userInteracted) {
    return (
      <>
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 z-50 p-6 text-center overflow-hidden">
          {/* Animated floating hearts */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-floatHeart absolute top-10 left-1/4 text-3xl">
              💖
            </div>
            <div className="animate-floatHeart absolute top-20 right-1/3 text-4xl">
              💌
            </div>
            <div className="animate-floatHeart absolute top-1/2 left-2/3 text-3xl">
              🌸
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-pink-700 drop-shadow-lg animate-bounce mb-6">
            হেই Maishuuuu, কেমন আছো :(( 😻
          </h1>

          <div className="mb-8 w-full max-w-md bg-gradient-to-r from-pink-500 to-pink-700 p-6 rounded-3xl shadow-2xl animate-pulse drop-shadow-lg">
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-semibold text-center">
              {loveMessage}
            </p>
          </div>

          <button
            onClick={() => {
              audioContext.current?.resume();
              playSound("allTimeBgm", true);
              setUserInteracted(true);
            }}
            className="cursor-pointer bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-3xl shadow-2xl text-lg sm:text-xl font-bold hover:scale-105 hover:shadow-pink-400/80 transition-transform duration-300"
          >
            দেখতে চাও না, সামনে কী আছে? তবে প্রেস করো huh 😖
          </button>
          <FloatingHeart />
          <div className="absolute bottom-4 w-full text-center">
            <p className="credit-glow text-pink-700 text-xl font-bold animate-pulse">
              💖 This game is made only for you Maishuu to fix your mood ^_^ 💖
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-300 text-center relative overflow-hidden px-2 md:px-0">
      <h1 className="credit-glow text-2xl sm:text-3xl md:text-4xl font-extrabold text-pink-700 drop-shadow-lg animate-bounce mb-6 sm:mb-10">
        মুড ভালো করো Maishuuu 😻
      </h1>

      {!gameStarted && !gameOver && !happyEnd ? (
        <>
          <Instruction
            setGameStarted={setGameStarted}
            highScore={highScore}
            setOnViewLeaderboard={setOnViewLeaderboard}
            topThree={topThree}
            currentUserId={user._id}
          />
          <FloatingHeart />
        </>
      ) : gameOver ? (
        <>
          <GameOver
            score={score}
            handleHappyEnd={handleHappyEnd}
            restartGame={restartGame}
            gameoverMessage={message}
            highScore={highScore}
            user={user}
            setOnViewLeaderboard={setOnViewLeaderboard}
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
            {missed.heart}/10 | Missed 🌹: {missed.rose}/8
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
