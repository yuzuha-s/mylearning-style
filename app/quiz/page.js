"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft,  Smile, Frown, ArrowRight } from "lucide-react";

const PersonalityQuiz = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const totalQuestions = 8;
  const progress = (currentQuestion / totalQuestions) * 100;

  const questions = [
    "なぜそうなるのか、理屈を納得してから進みたい？",
    "説明書より、まずは実際に触って体感したい？",
    "毎日決まったルーティンで進めるのが好き？",
    "スイッチが入った時の没頭力には自信がある？",
    "知識を体系立てて整理して覚えるのが得意？",
    "何かを作りながら学ぶ方が記憶に残る？",
    "大きな目標を一歩ずつ着実に進めるのが好き？",
    "短時間で一気に深い集中状態になりたい？",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-widest">
            QUESTION 0{currentQuestion}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-500">
              あと {totalQuestions - currentQuestion + 1} 問
            </span>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
        </button>
      </div>

      {/* Question Text */}
      <div className="mb-10 text-center">
        <h2 className="text-xl font-bold leading-relaxed px-4 text-gray-900">
          {questions[currentQuestion - 1]}
        </h2>
      </div>

      {/* Center Illustration Placeholder */}
      <div className="flex-grow flex items-center justify-center mb-10">
        <div className="w-full max-w-sm aspect-square bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
          {/* ここにイラスト（SVGやImage）が入ります */}
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="space-y-4">
        <div className="flex gap-4">
          {/* YES Button */}
          <button
            onClick={() =>
              currentQuestion < totalQuestions &&
              setCurrentQuestion((prev) => prev + 1)
            }
            className="flex-1 bg-white border-b-4 border-blue-500 rounded-2xl p-4 shadow-sm active:translate-y-0.5 active:border-b-0 transition-all flex flex-col items-center gap-2"
          >
            <Smile className="text-blue-500" size={32} />
            <span className="font-bold text-blue-500">YES / はい</span>
          </button>

          {/* NO Button */}
          <button
            onClick={() =>
              currentQuestion < totalQuestions &&
              setCurrentQuestion((prev) => prev + 1)
            }
            className="flex-1 bg-white border-b-4 border-orange-500 rounded-2xl p-4 shadow-sm active:translate-y-0.5 active:border-b-0 transition-all flex flex-col items-center gap-2"
          >
            <Frown className="text-orange-500" size={32} />
            <span className="font-bold text-orange-500">NO / いいえ</span>
          </button>
        </div>

        {/* See Results Button (Shown only on the last question) */}
        {currentQuestion === totalQuestions && (
          <button
            onClick={() => router.push("/result")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1"
          >
            診断結果を見る
            <ArrowRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PersonalityQuiz;
