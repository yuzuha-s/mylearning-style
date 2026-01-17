"use client";
import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="flex flex-col min-h-screen bg-white items-center justify-center p-6 text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-8"></div>
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        あなたの個性を分析しています...
      </h2>
      <div className="w-full max-w-xs h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-100 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <p className="mt-4 text-blue-600 font-mono font-bold">{percent}%</p>
    </div>
  );
};

export default LoadingScreen;
