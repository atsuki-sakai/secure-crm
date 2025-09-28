# 目的: 運用方針に従い、既定ブランチ(自動判定)に向けたPRを日本語で作成。本文に Close #<ISSUE>、確認手順、影響、リスク等を自動整形。
# 入力不要。必要なら REVIEWERS のみ任意指定可能（無指定でも可）。

# ==== 自動取得 ====
ISSUE_NUMBER: feat/<ISSUE> から抽出
BASE_BRANCH: 既定ブランチ自動判定（作業開始コマンドと同じ）
HEAD_BRANCH: `git rev-parse --abbrev-ref HEAD`
TITLE: `git log -1 --pretty=%s` をベースに `#<ISSUE>` を付加（例: "feat(contact-page): ... #123"）
CHECKS: `git status --porcelain` が空であること、lint/testの結果を要約（存在すれば）
RISK: 変更拡張 or 破壊的変更の有無を差分から簡潔要約

# ==== 本文テンプレ ====
Close #{ISSUE_NUMBER}

## 目的
- <1-2行>

## 変更内容
- <箇条書き 3-7項目>

## 確認手順
1. <再現/確認手順>
2. <期待結果>

## 影響範囲
- <依存/後方互換/移行要否>

## リスクとロールバック
- <発生し得る不具合と戻し方>

## チェック
- <lint/test/ビルド確認など>

## Tips / 学習共有
- <詰まりポイント/運用TIPS>

# ==== 実行 ====
1) 本文を /tmp/pr_body_ai.txt に保存（上のテンプレに自動充填）
2) `gh pr create --base "$BASE_BRANCH" --head "$HEAD_BRANCH" --title "$TITLE" --body-file /tmp/pr_body_ai.txt` （必要なら `--reviewer userA,userB`）
3) 出力: PR URL
