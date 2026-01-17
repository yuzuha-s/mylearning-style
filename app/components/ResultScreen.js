"use client";
import React, { useEffect } from "react"; 
import Link from "next/link";
import confetti from "canvas-confetti";
import { RotateCcw, Home } from "lucide-react";

const ResultScreen = ({ onRestart }) => {
  useEffect(() => {
    // ページが表示された瞬間にクラッカーを鳴らす！
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);

    return () => clearInterval(interval); // お片付け
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans p-6 overflow-y-auto">
      {/* 1. Header: クラッカー演出用の弾むテキスト */}
    <div className="flex justify-center items-center mb-6">
  <span className="bg-orange-100 text-orange-700 text-sm font-bold px-5 py-2 rounded-full tracking-widest">
    分析が完了しました
  </span>
</div>

      {/* 2. Main Result Card */}
      <div className="bg-white rounded-[32px] p-8 shadow-sm border border-gray-100 mb-6 flex flex-col items-center text-center">
        <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl rotate-12 flex items-center justify-center shadow-lg">
            <span className="text-white text-3xl">💡</span>
          </div>
        </div>

        <h3 className="text-gray-400 font-bold text-sm tracking-widest mb-2">
          PERSONALITY TYPE
        </h3>
        <h2 className="text-3xl font-black text-gray-900 mb-6">理論重視型</h2>

        <div className="w-12 h-1.5 bg-blue-500 rounded-full mb-8"></div>

        <p className="text-gray-700 leading-loose text-left bg-gray-50 p-6 rounded-2xl border border-gray-100 italic">
          「なぜ？」を解決することがやる気の源泉です。全体像を把握し、納得してから進むことで驚異的な理解力を発揮します。論理的なつながりが見えた時、あなたの学習スピードは最大化されます。
        </p>
      </div>

      {/* 3. Actions */}
      <div className="space-y-4">
        <Link href="/quiz">
          <button
            onClick={onRestart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <RotateCcw size={20} />
            再度診断する
          </button>
        </Link>

        <Link href="/home">
          <button className="w-full bg-white border border-gray-200 text-gray-500 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-all active:bg-gray-100">
            <Home size={18} />
            Home
          </button>
        </Link>
      </div>

      {/* 4. Footer */}
      <div className="py-8 text-center">
        <p className="text-xs text-gray-300 tracking-tighter">
          © 2026 SELF-DIAGNOSIS APP
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;
