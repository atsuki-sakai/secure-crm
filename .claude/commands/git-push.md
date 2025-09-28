# 目的: 既定ブランチを基準にローカル履歴を線形化（rebase）し、順序を保ったまま安全にリモートへ反映する。
# 入力: なし（既定ブランチ/現在ブランチ/上流は自動判定）
# 前提: 作業ツリーはクリーン（未コミットがあれば中断）

# 1) 作業ツリー確認（未コミットなら中断）
git diff --quiet && git diff --cached --quiet || { echo "未コミットの変更があります。コミット後に再実行してください。"; exit 2; }

# 2) 既定ブランチを自動判定（origin/HEAD → dev/main 等）
DEFAULT_BRANCH="$(git symbolic-ref --short refs/remotes/origin/HEAD 2>/dev/null | sed 's@^origin/@@')"
[ -z "$DEFAULT_BRANCH" ] && DEFAULT_BRANCH="$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name 2>/dev/null)"
[ -z "$DEFAULT_BRANCH" ] && DEFAULT_BRANCH="main"

# 3) 現在ブランチ取得（feat/<ISSUE>想定）
CUR="$(git rev-parse --abbrev-ref HEAD)"

# 4) FF only設定＋最新取得
git config pull.ff only
git fetch --all --prune

# 5) 上流が未設定なら origin/<CUR> を紐付け（初回のみ）
git rev-parse --abbrev-ref --symbolic-full-name "@{upstream}" >/dev/null 2>&1 || git push -u origin "$CUR"

# 6) 既定ブランチ最新へ線形化（順序維持）。衝突時は手動解決→`git rebase --continue`
git rebase --rebase-merges --autosquash --autostash "origin/${DEFAULT_BRANCH}"

# 7) まず通常push（FFなら成功）。非FFで拒否されたら lease 付き強制で安全に反映。
git push || git push --force-with-lease

# 8) 完了表示
echo "Pushed ${CUR} → origin/${CUR}（基準: ${DEFAULT_BRANCH}）"
