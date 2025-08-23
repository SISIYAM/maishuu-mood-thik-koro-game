import React from "react";

function HappyEnd({
  happyMessage,
  restartGame,
  setFunnyMsg,
  setShowFunnySection,
}) {
  const rejectMessage =
    "কেনো খেলবা না? এত কষ্ট করে তোমার জন্য game বানাইলাম, আর তুমি এমন করলা! hyreee :((( ughhh";

  return (
    <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow-2xl p-6 z-10 w-full max-w-md">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-600 mb-4 animate-bounce">
        {happyMessage}
      </h2>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full justify-center relative">
        <button
          onClick={restartGame}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md w-full sm:w-auto cursor-pointer"
        >
          আবার খেলবো 😁
        </button>

        <button
          onClick={() => {
            setFunnyMsg(rejectMessage);
            setShowFunnySection(true);
          }}
          className="px-6 py-3 bg-red-400 text-white rounded-xl font-bold shadow-lg w-full sm:w-auto cursor-pointer"
        >
          না আর খেলবো না 😒
        </button>
      </div>
    </div>
  );
}

export default HappyEnd;
