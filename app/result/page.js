"use client";
import React, { useMemo, Suspense } from "react";
import LoadingScreen from "../components/LoadingScreen";
import ResultScreen from "../components/ResultScreen";

export default function ResultPage() {
  // localStorageから初期データを取得
  const resultData = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const savedData = localStorage.getItem("quizResultData");
    return savedData ? JSON.parse(savedData) : null;
  }, []);

  // 結果データがあるかで表示を判定
  const currentView = resultData ? "result" : "loading";

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app-container">
        {currentView === "loading" ? (
          // ローディングが終わったら result に切り替え
          <LoadingScreen onFinish={() => setCurrentView("result")} />
        ) : (
          // 2. ResultScreenにデータを渡して表示する！
          <ResultScreen result={resultData} />
        )}
      </div>
    </Suspense>
  );
}
