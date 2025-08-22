import React from "react";

function GameOver({ score, handleHappyEnd, restartGame, gameoverMessage }) {
  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-6 z-10 w-full max-w-md">
      <h2 className="text-2xl font-bold text-red-500 mb-4 animate-bounce">
        Game Over 😭
      </h2>
      <p className="text-lg mb-6 text-gray-700 animate-bounce">
        {gameoverMessage}!
      </p>
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
  );
}

export default GameOver;
