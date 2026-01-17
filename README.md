# 学習スタイル診断アプリ

## 技術スタック

- React
- Next.js (ReactのフレームワークであるNext.jsを使う)

## 要件定義

使用AIツール：Gemini

### 結果

理論重視型 / 実践重視型 / コツコツ型 / 短期集中型

| タイプ     | キーワード | 説明                                                     |
| ---------- | ---------- | -------------------------------------------------------- |
| 理論重視型 | 理解力     | まずは説明書や理論を読んでから始めたい                   |
| 実践重視型 | 行動力     | やりながら覚えるのが一番効率がいいと思う                 |
| コツコツ型 | 継続力     | 毎日決まった時間に少しずつ進めるのが好き                 |
| 短期集中型 | 没頭力     | 一度スイッチが入ると、短時間で一気に深い集中状態になれる |

### 診断：質問リスト

| 問  | 質問                                           | キーワード           |
| --- | ---------------------------------------------- | -------------------- |
| Q1  | なぜそうなるのか、理屈を納得してから進みたい？ | 理論重視型（理解力） |
| Q2  | 説明書より、まずは実際に触って体感したい？     | 実践重視型（行動力） |
| Q3  | 毎日決まったルーティンで進めるのが好き？       | コツコツ型（継続力） |
| Q4  | スイッチが入った時の没頭力には自信がある？     | 短期集中型（没頭力） |
| Q5  | 知識を体系立てて整理して覚えるのが得意？       | 理論重視型（理解力） |
| Q6  | 何かを作りながら学ぶ方が記憶に残る？           | 実践重視型（行動力） |
| Q7  | 大きな目標を一歩ずつ着実に進めるのが好き？     | コツコツ型（継続力） |
| Q8  | 短時間で一気に深い集中状態になりたい？         | 短期集中型（没頭力） |

### 回答文

| タイプ             | キーワード       | 解説メッセージ（回答文）                                                                                                                                                           |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 理論重視型         | 理解力           | 「なぜ？」を解決することがやる気の源泉です。全体像を把握し、納得してから進むことで驚異的な理解力を発揮します。論理的なつながりが見えた時、あなたの学習スピードは最大化されます。   |
| 実践重視型         | 行動力           | 考えてから動くより、動いてから考える方が得意なタイプ。まずは手を動かし、小さな失敗を積み重ねるのが一番の近道です。理論は後からついてくる、というスタンスがあなたには合っています。 |
| コツコツ型         | 継続力           | 継続こそが最大の武器。派手な一歩よりも、昨日の自分を超える数ミリの積み重ねが自信に繋がります。最終的に誰よりも高い場所に到達できる、圧倒的な安定感の持ち主です。                   |
| 短期集中型         | 没頭力           | 集中した時の密度はピカイチ。スイッチが入った時に一気に進め、無理に分散させず「今はこれ！」と決めて没頭するのが吉です。短時間で本質を掴み取る、瞬発力のある学習スタイルです。       |
| 万能ハイブリット型 | すべて「はい」   | おめでとうございます！あらゆる学習方法を高い次元で使いこなせる最強の学習者です。状況に合わせてスタイルを自由自在に使い分けられます。                                               |
| これから発見型     | すべて「いいえ」 | まだ自分にぴったりのスタイルを探している最中かもしれません。まずは「これなら楽しそう」と思えるものから、宝探しのように試してみましょう！                                           |

### Mix型の場合

| 型                  | キーワード                                 |
| ------------------- | ------------------------------------------ |
| 理論 × 実践         | 納得感と行動力をどちらも備えたバランス派！ |
| 理論 × コツコツ     | 納得感と継続力をどちらも備えたバランス派！ |
| 実践 × 短期集中     | 行動力と没頭力をどちらも備えたバランス派   |
| コツコツ × 短期集中 | 継続力と没頭力をどちらも備えたバランス派！ |

## 設計

### ロジック

- 各タイプのスコアを出す
- 最大値を探す
- 同点のチェックをする
  - 「1位が単独」なら、そのままそのタイプを表示。
  - 「1位が同点（2つ）」なら、Mixタイプを表示。
- 一番強かった個性があなたのタイプとなる

優先順位：理論 ＞ 実践 ＞ コツコツ ＞ 短期集中の順番で優先する

## デザイン

使用AIツール：Manus

使用AIツール：Google Stitch

![image.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/4052007/1789c884-d30c-4213-aaf4-5a4cb82ed7d0.png)

![alt text](image.png)

ローディング画面

<img width="170px" src="image-1.png">

## コーディング

使用AIツール：Gemini

## テスト

## CI/CD（自動チェック）

## 評価観点（重要）

- [ ] 要件定義が筋が通っているか
- [ ] 設計が破綻していないか
- [ ] AIを「考える補助」として使えているか
- [ ] 自分の言葉で説明できるか
- [ ] 診断結果に納得感があるか

## Next.js初期設定

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
