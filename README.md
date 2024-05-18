## 名称

### オセロゲーム(Alpha Reversi)
 オセロゲームをしながら、オセロに強くなろう！
 
 タイトル画面↓
![image](https://github.com/HonjyouDaisuke/alpha-reversi/assets/78740184/86ca9f72-64f2-4f17-8324-badea3f6efb4)

 ゲーム中の画面↓
 ![image](https://github.com/HonjyouDaisuke/alpha-reversi/assets/78740184/b30c855d-6ddc-4675-a841-ea963ed2bf50)

　ヒントありの画面↓
 ![image](https://github.com/HonjyouDaisuke/alpha-reversi/assets/78740184/cc5cb8f6-fd50-46dc-9c53-7d59163165fd)

## 概要

単純なオセロゲームです。スタート画面では、対戦を選ぶことができます。
もちろん、コンピュータと対戦することができます。
一番下にあるヒントにチェックをしてスタートすると、人間の手を打つ順番では、置くことができるマスと一番おすすめな
うち手部分をピンクで光らせてくれます。なんとなくオセロの手を打つのではなく、このピンクがなぜ強調されているのかを
考えながら打つと、あなたのオセロスキルがアップすると思いますよ。ぜひチャレンジしてください。

## 技術仕様

| 項目名  | 内容 |
| ------------- | ------------- |
| 動作環境  | Web上(デプロイ先はVercel)  |
| 使用言語  | Typescript  |
| フレームワーク  | Nextjs v14.0.4 |
| css  | Tailwind CSS v3.4.1 |
| test環境  | Jest v29.7.0 |
| 状態管理  | jotai v2.8.0 |

### その他技術情報

その他の技術情報は以下を参照ください。

[技術情報へのリンク](/documents/design-doc.md)

## 利用方法

このプロジェクトはVercelにデプロイしていますので、以下をクリックして実行してみてください。

https://alpha-reversi.vercel.app/

## Getting Started

手元のマシンで動作させるには以下を実行してください

```bash
npm run dev
# or
yarn dev
# or
pnpm run dev
```
その後、以下をクリックしてブラウザを立ち上げてください。
[http://localhost:3000](http://localhost:3000)

テストを実行する場合は以下を実行してください。

```bash
npm run test
# or
yarn test
# or
pnpm run test
```

2024.05.18 D.Honjyou
