# 目的: ステージ済み差分から、運用方針に沿う小粒なコミットメッセージを日本語で自動生成し、即コミット。
# 入力不要。ブランチ名 feat/<ISSUE> から Issue 番号を自動抽出。型やスコープも自動推定。必要時のみ上書き可。

# ==== 前提 ====
# - 変更はすでに `git add` 済み（ステージ済み）であること。
# - ブランチ: feat/<ISSUE_NUMBER>

# ==== 推定ロジック ====
ISSUE_NUMBER: `git rev-parse --abbrev-ref HEAD | sed -n 's/^feat\\/\\([0-9]\\+\\).*$/\\1/p'`
SCOPE: `git diff --staged --name-only | sed -E 's@^([^/]+).*@\\1@' | sort -u | tr '\\n' ',' | sed 's/,$//'`
TYPE(暫定):
  - docs配下/ *.md → docs
  - test/ / *.test.* / __tests__ → test
  - *.css|*.scss|*.sass|*.tailwind.* → style
  - package*.json, lockfile, ci設定, lint設定 → chore
  - *.ts|*.tsx → feat（差分にfix/bug等の明示語が多ければfix）
SUMMARY: 変更によるステージ差分の要点を日本語50字以内に要約
WHY/WHAT/TEST/IMPACT: 簡潔に整形し読みやすく（各2〜4行/箇条書き）

# ==== 実行 ====
- ステージ差分が無ければ中断。
- 上記推定でメッセージ本文を生成し、.git/COMMIT_EDITMSG_AI に保存。
- `git commit -F .git/COMMIT_EDITMSG_AI`
- Generated with [Claude Code](https://claude.ai/code)は必要ないのでつけない。

# ==== フォーマット ====
{TYPE}({SCOPE}): {SUMMARY}

Why:
- <背景/目的>

What:
- <主要変更点(箇条書き)>

Test:
- <実施した確認と結果>

Impact:
- <影響範囲/後方互換/移行手順>

Refs: #{ISSUE_NUMBER}
