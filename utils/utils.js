import axios from "axios";

export const funnyTexts = [
  "আমি জানি আমি একটু বলদ, তাও মুড ঠিক করো huh frr :( 😓",
  "Maishuuu, মুড অন না হলে আমি system format করব 🔥",
  "মুড ঠিক করো না হলে আমি শেষ frrr 😖🔁",
  "Maishuuu, মুড অফ থাকলে আমি stray cat হয়ে যাই huh :(😼",
];

export const gameMessages = [
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

export const happyEndMessages = [
  "ইয়েসস! মুড fix হয়ে গেছে Maishuuu! :) 😻",
  "এইবার হাসি upload করো! frrr XD XD 😂",
  "Mood booster সফল huh XD XD🚀",
  "Maishuuu = 100% Happy yeeeey ^_^ ❤️",
];

export const loveMessages = [
  "হাসি ছড়াও, মুড ভালো করো huh💖",
  "তোমার জন্য কিছু বিশেষ বানিয়েছি ^_^ 😻",
  "তুমি হাসলে আমি খুশি frrr 😊",
];

// set leaderboard on server
export const setLeaderboard = async (userId, score) => {
  try {
    const response = await axios.post("/api/leaderboard", { userId, score });

    return response.data;
  } catch (error) {
    console.error("Failed to update leaderboard:", error);
    return { error: "Failed to update leaderboard" };
  }
};

/// get global high score
export const getGlobalHighScore = async () => {
  try {
    const response = await axios.get("/api/leaderboard");
    return response.data;
  } catch (error) {
    console.error("Failed to update leaderboard:", error);
    return { error: "Failed to update leaderboard" };
  }
};
