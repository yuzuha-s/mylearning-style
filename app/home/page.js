import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const StartScreen = ({ onStart }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans p-6 justify-between">
      {/* Top Logo/Title */}
      <div className="pt-10 flex justify-center">
        <h1 className="text-sm font-bold tracking-widest text-gray-500">
          LOGIQUS（ロジカス）
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center">
        <div className="w-64 h-64 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-8 relative overflow-hidden">
          {/* Abstract background shape */}
          <div className="absolute inset-0 bg-blue-50 opacity-50 rounded-full scale-90 translate-x-4 translate-y-4"></div>
          {/* Illustration Placeholder */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 bg-blue-500 rounded-2xl flex items-center justify-center mb-2 rotate-12">
              <div className="w-12 h-12 border-4 border-white rounded-full"></div>
            </div>
            <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center -mt-8 -mr-16">
              <div className="w-6 h-1 bg-white"></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-900 mb-4 leading-tight">
          本当の自分を
          <br />
          見つける旅へ
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed px-6">
          いくつかの質問に答えるだけで、あなたの強みと個性を可視化します。
          <br />
          <span className="font-bold text-gray-400 mt-2 block">
            所要時間：約3分
          </span>
        </p>
      </div>

      {/* Start Button */}
      <div className="pb-10">
        <Link href="/quiz">
          {" "}
          <button
            onClick={onStart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 active:scale-95"
          >
            診断をはじめる
            <ArrowRight size={22} />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default StartScreen;
