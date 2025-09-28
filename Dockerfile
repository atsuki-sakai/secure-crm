
# ベースイメージ: Node.js公式の軽量版を採用し、サイズとセキュリティのバランスを取る
FROM node:18-slim AS base

# 日本語コメント: 依存パッケージをビルドするために必要なビルドツールをまとめて導入
RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    make \
    g++ \
  && rm -rf /var/lib/apt/lists/*

# システムユーザーを追加してルート権限での実行を避ける
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# 依存パッケージをインストールするステージ
FROM base AS dependencies
WORKDIR /app

# package.json と lock ファイルだけを先にコピーしてキャッシュを最大限活用
COPY package.json package-lock.json* ./

# 日本語コメント: 再現性のあるインストールのため npm ci を使用
RUN npm ci --include=optional --include=dev

# 日本語コメント: CPUアーキテクチャに応じたCSS関連のネイティブバイナリを追加取得
RUN set -eux; \
  arch="$(dpkg --print-architecture)"; \
  case "$arch" in \
    arm64) npm install --no-save lightningcss-linux-arm64-gnu @tailwindcss/oxide-linux-arm64-gnu ;; \
    amd64) npm install --no-save lightningcss-linux-x64-gnu @tailwindcss/oxide-linux-x64-gnu ;; \
    *) echo "対応するネイティブバイナリがないためソースビルドを試みます"; \
       npm rebuild lightningcss --verbose || true; \
       npm rebuild @tailwindcss/oxide --verbose || true ;; \
  esac

# lightningcss のバイナリが環境に応じて必要になるためリビルドを実施
RUN npm rebuild lightningcss --verbose || echo "lightningcss rebuild failed, continuing..."
# Tailwind CSS のバイナリも再構築して整合性を確保
RUN npm rebuild @tailwindcss/oxide --verbose || echo "tailwindcss oxide rebuild failed, continuing..."

# ビルド専用ステージ。本番用の最適化ビルドをここで作成
FROM dependencies AS builder
COPY . .

# Next.js のビルドでは NODE_ENV=production を明示する
ENV NODE_ENV=production

# 日本語コメント: Next.js の静的資産を生成
RUN npm run build

# ランタイム用ステージ。実行に必要な最小限のファイルをコピー
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# 先ほど追加した非特権ユーザーをコピーして利用
RUN groupadd --system --gid 1001 nodejs \
  && useradd --system --uid 1001 --gid nodejs nextjs

# 日本語コメント: ビルド済み成果物と依存のみを配置
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package.json ./package.json

USER nextjs

# Next.js アプリが待ち受けるポートを定義
EXPOSE 3000

# デフォルトでは本番サーバーを起動。compose 側で dev コマンドを指定できる
CMD ["npm", "run", "start"]
