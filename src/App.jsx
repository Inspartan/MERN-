// ✅ Imports
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Main App
export default function App() {
  const [quote, setQuote] = useState("Loading a motivational quote...");
  const [author, setAuthor] = useState("");
  const [index, setIndex] = useState(0);
  const [bgGradient, setBgGradient] = useState("from-gray-900 via-gray-800 to-black");
  const [greeting, setGreeting] = useState("");

  // ✅ Saved quotes
  const [savedQuotes, setSavedQuotes] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // ✅ Fetch quote (CORS-friendly)
  const fetchQuote = async () => {
    try {
      const res = await fetch(
        "https://api.allorigins.win/get?url=" +
          encodeURIComponent("https://zenquotes.io/api/random")
      );
      const data = await res.json();
      const quoteData = JSON.parse(data.contents);
      setQuote(quoteData[0].q);
      setAuthor(quoteData[0].a);
      setIndex((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setQuote("Stay positive even when things break!");
      setAuthor("");
    }
  };

  // ✅ Save current quote
  const saveQuote = () => {
    const currentQuote = { text: quote, author };
    const exists = savedQuotes.some(
      (q) => q.text === currentQuote.text && q.author === currentQuote.author
    );
    if (!exists) {
      const updated = [...savedQuotes, currentQuote];
      setSavedQuotes(updated);
      localStorage.setItem("favorites", JSON.stringify(updated));
      alert("Quote saved! ✅");
    } else {
      alert("You already saved this quote!");
    }
  };

  // ✅ Update greeting + background
  const updateTimeMood = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 11) setGreeting("Good Morning 🌅");
    else if (hour >= 11 && hour < 17) setGreeting("Good Afternoon ☀️");
    else if (hour >= 17 && hour < 20) setGreeting("Good Evening 🌇");
    else setGreeting("Good Night 🌙");

    if (hour >= 5 && hour < 11) setBgGradient("from-yellow-300 to-orange-400");
    else if (hour >= 11 && hour < 17) setBgGradient("from-blue-400 to-blue-700");
    else if (hour >= 17 && hour < 20) setBgGradient("from-purple-700 to-pink-500");
    else setBgGradient("from-gray-800 to-black");
  };

  // ✅ Run on load
  useEffect(() => {
    updateTimeMood();
    fetchQuote();
    const interval = setInterval(updateTimeMood, 60000);
    return () => clearInterval(interval);
  }, []);

  // ✅ JSX Layout
  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center bg-gradient-to-br ${bgGradient} text-white px-4`}
    >
      <div className="text-center max-w-md w-full">
        {/* Greeting */}
        <AnimatePresence mode="wait">
          <motion.h2
            key={greeting}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-semibold mb-4"
          >
            {greeting}
          </motion.h2>
        </AnimatePresence>

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">Daily Motivation 💫</h1>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="text-xl italic mb-2 transition-all duration-300"
          >
            “{quote}”
          </motion.p>
        </AnimatePresence>
        {author && <p className="text-md mb-4 opacity-80">— {author}</p>}

        {/* Buttons */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            onClick={fetchQuote}
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-100 transition"
          >
            Inspire Me ✨
          </button>
          <button
            onClick={saveQuote}
            className="bg-pink-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-pink-600 transition"
          >
            ❤️ Save Quote
          </button>
          <button
            onClick={() => {
              const text = `"${quote}" — ${author}`;
              const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
              window.open(url, "_blank");
            }}
            className="bg-blue-500 px-6 py-3 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            🐦 Tweet Quote
          </button>
        </div>

        {/* Saved Quotes Section */}
        <div className="mt-4 text-left w-full">
          <h2 className="text-2xl font-semibold mb-2">💾 Saved Quotes</h2>
          {savedQuotes.length === 0 && <p>No saved quotes yet.</p>}
          <ul className="space-y-4 max-h-64 overflow-y-auto">
            {savedQuotes.map((q, i) => (
              <li
                key={i}
                className="bg-white text-gray-800 p-3 rounded-lg shadow-md flex flex-col gap-1"
              >
                <p className="italic">“{q.text}”</p>
                <p className="font-semibold">— {q.author}</p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => {
                      const text = `"${q.text}" — ${q.author}`;
                      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        text
                      )}`;
                      window.open(url, "_blank");
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  >
                    🐦 Tweet
                  </button>
                  <button
                    onClick={() => {
                      const updated = savedQuotes.filter((_, idx) => idx !== i);
                      setSavedQuotes(updated);
                      localStorage.setItem("favorites", JSON.stringify(updated));
                    }}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  >
                    ❌ Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
