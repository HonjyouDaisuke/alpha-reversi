## 名称

### オセロゲーム(Alpha Reversi)
 オセロゲームをしながら、オセロに強くなろう！

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
