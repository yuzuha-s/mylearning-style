"use client";

import React, { useEffect, useState } from "react";

const LoadingScreen = ({ onFinish }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    // 1. プログレスバーのアニメーション（シミュレーション）
    const interval = setInterval(() => {
      setPercent((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // 約3秒で100%に

    // 2. 100%になった少し後に親コンポーネントへ通知して画面を切り替える
    const timer = setTimeout(() => {
      onFinish();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinish]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center p-6">
      {/* 以前作成したローディングのデザイン（回転する円など） */}
      <div className="mb-8">{/* くるくる回るアニメーションなど */}</div>

      <h2 className="text-xl font-bold mb-4">
        あなたの個性を分析しています...
      </h2>

      {/* プログレスバー（画像の「PROCESSING」部分） */}
      <div className="w-full max-w-xs text-xs font-bold text-teal-600 mb-2 flex justify-between uppercase tracking-widest">
        <span>Processing</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full max-w-xs h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-500 transition-all duration-100 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
