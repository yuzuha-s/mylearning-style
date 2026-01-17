"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { RotateCcw, Home } from "lucide-react";

interface ResultScreenProps {
  result: { title: string; desc: string };
  onRestart: () => void;
}

const ResultScreen: React.FC<ResultScreenProps> = ({ result, onRestart }) => {
  const isHydratedRef = useRef(false);
  const typeDetails: { [key: string]: { keyword: string; text: string } } = {
    理論重視型: {
      keyword: "理解力",
      text: "「なぜ？」を解決することがやる気の源泉です。全体像を把握し、納得してから進むことで驚異的な理解力を発揮します。論理的なつながりが見えた時、あなたの学習スピードは最大化されます。",
    },
    実践重視型: {
      keyword: "行動力",
      text: "考えてから動くより、動いてから考える方が得意なタイプ。まずは手を動かし、小さな失敗を積み重ねるのが一番の近道です。理論は後からついてくる、というスタンスがあなたには合っています。",
    },
    コツコツ型: {
      keyword: "継続力",
      text: "継続こそが最大の武器。派手な一歩よりも、昨日の自分を超える数ミリの積み重ねが自信に繋がります。最終的に誰よりも高い場所に到達できる、圧倒的な安定感の持ち主です。",
    },
    短期集中型: {
      keyword: "没頭力",
      text: "集中した時の密度はピカイチ。スイッチが入った時に一気に進め、無理に分散させず「今はこれ！」と決めて没頭するのが吉です。短時間で本質を掴み取る、瞬発力のある学習スタイルです。",
    },
    "理論 × 実践": {
      keyword: "ハイブリッド",
      text: "納得感と行動力をどちらも備えたバランス派！効率よく、かつ確実に成果を出すことができる最強の組み合わせです。",
    },
    "理論 × コツコツ": {
      keyword: "着実な戦略家",
      text: "納得感と継続力をどちらも備えたバランス派！緻密な計画と実行力で、着実に目標を達成します。",
    },
    "実践 × 短期集中": {
      keyword: "瞬発的行動派",
      text: "行動力と没頭力をどちらも備えたバランス派！チャンスを逃さず、一気に結果まで駆け抜けるパワーがあります。",
    },
    "コツコツ × 短期集中": {
      keyword: "変幻自在",
      text: "継続力と没頭力をどちらも備えたバランス派！日々の習慣と爆発的な集中力を使い分けられる実力者です。",
    },
    万能ハイブリット型: {
      keyword: "全能",
      text: "おめでとうございます！あらゆる学習方法を高い次元で使いこなせる最強の学習者です。状況に合わせてスタイルを自由自在に使い分けられます。",
    },
    これから発見型: {
      keyword: "未知の可能性",
      text: "まだ自分にぴったりのスタイルを探している最中かもしれません。まずは「これなら楽しそう」と思えるものから、宝探しのように試してみましょう！",
    },
  };

  // 判定結果に基づいてデータを取得（なければデフォルト）
  const info = typeDetails[result.title] || {
    keyword: "分析中",
    text: result.desc,
  };

  // ハイドレーション完了後にアニメーションを実行
  useEffect(() => {
    // 初回マウント時にハイドレーション完了フラグを設定
    isHydratedRef.current = true;

    // ページが表示された瞬間にクラッカーを鳴らす！
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

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

        <div className="flex justify-center items-center mb-6">
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest">
            {info.keyword}
          </span>
        </div>
        <h2 className="text-3xl font-black text-gray-900 mb-6">{result.title}</h2>

        <div className="w-12 h-1.5 bg-blue-500 rounded-full mb-8"></div>

        <p className="text-gray-700 leading-loose text-left bg-gray-50 p-6 rounded-2xl border border-gray-100 italic">
          {info.text}
        </p>
      </div>

      {/* 3. Actions */}
      <div className="space-y-4">
        <Link href="/quiz">
          <button
            onClick={onRestart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-100 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            再度診断する
            <RotateCcw size={20} />
          </button>
        </Link>
        <div></div>
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
