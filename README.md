# Secure CRM

Next.js 15、React 19、TypeScriptで構築されたモダンで安全な顧客関係管理(CRM)アプリケーションです。

## 🚀 技術スタック

- **Next.js 15.5.4** App Router & Turbopack対応
- **React 19.1.0** TypeScript対応
- **Tailwind CSS v4** PostCSS統合
- **Shadcn UI** コンポーネント (New Yorkスタイル)
- **Radix UI** アクセシビリティ対応プリミティブ
- **Supabase** 認証・データベース
- **Lucide React** アイコンライブラリ
- **Zod** スキーマ検証
- **Vitest** テストフレームワーク

## 📁 プロジェクト構成

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # 認証ルート
│   ├── (dashboard)/       # ダッシュボードルート
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # ホームページ
│   └── globals.css        # グローバルスタイル
├── components/
│   └── ui/                # Shadcn UIコンポーネント
└── lib/
    └── utils.ts           # ユーティリティ関数
```

## 🛠 開発環境セットアップ

### 必要な環境

- Node.js 18+
- npm または yarn
- Docker (オプション、コンテナ開発用)

### ローカル開発

1. リポジトリをクローン:
```bash
git clone <repository-url>
cd secure-crm
```

2. 依存関係をインストール:
```bash
npm install
```

3. Turbopack対応開発サーバーを起動:
```bash
npm run dev
```

4. ブラウザで [http://localhost:3000](http://localhost:3000) を開く

### 利用可能なスクリプト

```bash
# Turbopack対応開発サーバー
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# リント実行
npm run lint

# テスト実行
npm run test
```

## 🐳 Docker環境での起動

### Docker開発環境

Dockerを使用して開発モードでアプリケーションを実行:

```bash
# 開発コンテナをビルドして起動
docker-compose up --build

# デタッチモードで実行
docker-compose up -d

# コンテナを停止
docker-compose down
```

### Docker本番環境

本番用コンテナをビルドして実行:

```bash
# 本番イメージをビルド
docker build -t secure-crm .

# 本番コンテナを実行
docker run -p 3000:3000 secure-crm
```

docker-composeを使用した本番環境:

```bash
# 本番環境を起動
docker-compose -f docker-compose.yml up --build

# 本番環境を停止
docker-compose down
```

アプリケーションは [http://localhost:3000](http://localhost:3000) でアクセス可能です。

## 🎨 UIコンポーネント

このプロジェクトはShadcn UIコンポーネントの「New York」スタイルバリアントを使用しています。コンポーネントはアクセシビリティ対応のRadix UIプリミティブ上に構築されています。

### 新しいコンポーネントの追加

```bash
# 新しいShadcnコンポーネントを追加
npx shadcn@latest add [component-name]
```

コンポーネントは確立されたパターンに従います:
- 条件付きスタイリングには `cn()` ユーティリティを使用
- `class-variance-authority` でバリアント定義
- `@/` エイリアスを使用したインポートパス

## 🔒 機能

- **認証**: Supabaseによる安全なユーザー認証
- **ダッシュボード**: モダンなダッシュボードインターフェース
- **レスポンシブデザイン**: モバイルファーストのレスポンシブ設計
- **型安全性**: 完全なTypeScriptカバレッジ
- **アクセシビリティ**: WCAG準拠コンポーネント
- **モダンUI**: Shadcn UIによるクリーンでプロフェッショナルなインターフェース

## 🚀 デプロイ

### Vercel (推奨)

最も簡単なデプロイ方法は [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) を使用することです。

### Dockerデプロイ

本番用Dockerイメージを使用してデプロイ:

```bash
# 本番用ビルド
docker build -t secure-crm .

# コンテナプラットフォームにデプロイ
docker run -p 3000:3000 secure-crm
```

## 📚 学習リソース

- [Next.js ドキュメント](https://nextjs.org/docs) - Next.jsの機能とAPIについて学ぶ
- [Shadcn UI](https://ui.shadcn.com/) - Radix UIとTailwind CSSで構築された再利用可能なコンポーネント
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [Supabase](https://supabase.com/) - オープンソースのFirebase代替