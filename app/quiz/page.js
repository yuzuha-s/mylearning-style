"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Smile, Frown, ArrowRight } from "lucide-react";

const PersonalityQuiz = () => {
  const router = useRouter();

  // --- 1. 質問データ ---
  const questions = [
    { id: 1, text: "なぜそうなるのか、理屈を納得してから進みたい？", type: "theory" },
    { id: 2, text: "説明書より、まずは実際に触って体感したい？", type: "practice" },
    { id: 3, text: "毎日決まったルーティンで進めるのが好き？", type: "continuity" },
    { id: 4, text: "スイッチが入った時の没頭力には自信がある？", type: "focus" },
    { id: 5, text: "知識を体系立てて整理して覚えるのが得意？", type: "theory" },
    { id: 6, text: "何かを作りながら学ぶ方が記憶に残る？", type: "practice" },
    { id: 7, text: "大きな目標を一歩ずつ着実に進めるのが好き？", type: "continuity" },
    { id: 8, text: "短時間で一気に深い集中状態になりたい？", type: "focus" },
  ];

  // --- 2. 状態管理 ---
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const totalQuestions = questions.length;
  const progress = ((currentStep + 1) / totalQuestions) * 100;
  const currentQuestionData = questions[currentStep];

  // --- 3. 判定ロジック ---
  const calculateResult = () => {
    const scores = { theory: 0, practice: 0, continuity: 0, focus: 0 };
    let yesCount = 0;
    
    Object.keys(answers).forEach((qId) => {
      if (answers[qId] === "yes") {
        const type = questions.find((q) => q.id === parseInt(qId)).type;
        scores[type]++;
        yesCount++;
      }
    });

    // 特殊判定1：万能ハイブリット（全部はい）
    if (yesCount === 8) {
      return {
        title: "万能ハイブリット型",
        desc: "おめでとうございます！あらゆる学習方法を高い次元で使いこなせる最強の学習者です。",
      };
    }

    // 特殊判定2：これから発見（全部いいえ）
    if (yesCount === 0) {
      return {
        title: "これから発見型",
        desc: "まだ自分にぴったりのスタイルを探している最中かもしれません。",
      };
    }

    // 通常のスコア計算
    const maxScore = Math.max(...Object.values(scores));
    const topTypes = Object.keys(scores).filter((type) => scores[type] === maxScore);
    const priorityOrder = ["theory", "practice", "continuity", "focus"];
    const sortedTopTypes = priorityOrder.filter((type) => topTypes.includes(type));

    // Mix判定（上位2つをチェック）
    if (sortedTopTypes.length >= 2) {
      const pair = `${sortedTopTypes[0]}_${sortedTopTypes[1]}`;
      const mixTypes = {
        theory_practice: { title: "理論 × 実践", desc: "納得感と行動力をどちらも備えたバランス派！" },
        theory_continuity: { title: "理論 × コツコツ", desc: "納得感と継続力をどちらも備えたバランス派！" },
        practice_focus: { title: "実践 × 短期集中", desc: "行動力と没頭力をどちらも備えたバランス派！" },
        continuity_focus: { title: "コツコツ × 短期集中", desc: "継続力と没頭力をどちらも備えたバランス派！" },
      };
      return mixTypes[pair] || { title: getSingleTitle(sortedTopTypes[0]), desc: "あなたの強みがはっきり出た結果です！" };
    }

    // 単独1位の場合
    return { 
      title: getSingleTitle(sortedTopTypes[0]), 
      desc: "あなたの強みがはっきり出た結果です！" 
    };
  };

  const getSingleTitle = (type) => {
    const titles = { theory: "理論重視型", practice: "実践重視型", continuity: "コツコツ型", focus: "短期集中型" };
    return titles[type];
  };

  // --- 4. ハンドラー ---
  const handleAnswer = (value) => {
    setAnswers({ ...answers, [currentQuestionData.id]: value });
    if (currentStep < totalQuestions - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const goToResult = () => {
    const finalResult = calculateResult();
    localStorage.setItem("quizResultData", JSON.stringify(finalResult));
    router.push("/result");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-800 font-sans p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <button onClick={handleBack} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1 rounded-full mb-2 tracking-widest">
            QUESTION 0{currentStep + 1}
          </span>
          <div className="flex items-center gap-2">
            <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-gray-500">あと {totalQuestions - currentStep} 問</span>
          </div>
        </div>
        <div className="w-10"></div>
      </div>

      {/* Question Text */}
      <div className="mb-10 text-center">
        <h2 className="text-xl font-bold leading-relaxed px-4 text-gray-900">{currentQuestionData.text}</h2>
      </div>

      {/* Illustration Placeholder */}
      <div className="flex-grow flex items-center justify-center mb-10">
        <div className="w-full max-w-sm aspect-square bg-white rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center">
          <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center">
            <div className={`w-20 h-20 rounded-full animate-pulse ${answers[currentQuestionData.id] ? "bg-blue-300" : "bg-blue-100"}`}></div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="space-y-4">
        <div className="flex gap-4">
          <button
            onClick={() => handleAnswer("yes")}
            className={`flex-1 border-b-4 rounded-2xl p-4 shadow-sm transition-all flex flex-col items-center gap-2 ${
              answers[currentQuestionData.id] === "yes" ? "bg-blue-50 border-blue-600 translate-y-0.5" : "bg-white border-blue-500"
            }`}
          >
            <Smile className="text-blue-500" size={32} />
            <span className="font-bold text-blue-500">YES / はい</span>
          </button>

          <button
            onClick={() => handleAnswer("no")}
            className={`flex-1 border-b-4 rounded-2xl p-4 shadow-sm transition-all flex flex-col items-center gap-2 ${
              answers[currentQuestionData.id] === "no" ? "bg-orange-50 border-orange-600 translate-y-0.5" : "bg-white border-orange-500"
            }`}
          >
            <Frown className="text-orange-500" size={32} />
            <span className="font-bold text-orange-500">NO / いいえ</span>
          </button>
        </div>

        {currentStep === totalQuestions - 1 && answers[currentQuestionData.id] && (
          <button
            onClick={goToResult}
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