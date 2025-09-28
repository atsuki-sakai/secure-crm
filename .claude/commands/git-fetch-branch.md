# 命令: 既存の feat/<ISSUE_NUMBER> をリモートから取得し、ローカルでチェックアウトして最新化する。

# 変数
{{ BASE_BRANCH }}: <例: main>
{{ ISSUE_NUMBER }}: <数字のみ 例: 123>

# 手順
1. 作業ディレクトリへ移動。
2. 作業ツリークリーン確認。未コミットがあれば中断。
3. `git config pull.ff only`
4. `git fetch --all --prune`
5. ブランチ存在判定:
   - ローカルに `feat/${ISSUE_NUMBER}` が無ければ作成:
     `git switch -c "feat/${ISSUE_NUMBER}" "origin/feat/${ISSUE_NUMBER}"`
     （存在しなければ: `git switch -c "feat/${ISSUE_NUMBER}" "${BASE_BRANCH}" && git push -u origin "feat/${ISSUE_NUMBER}"`）
   - 既にある場合は:
     `git switch "feat/${ISSUE_NUMBER}" && git pull`
6. `git status` を表示して作業再開可能性を確認。

# 期待出力
- ブランチ取得・最新化の結果。
- エラー時の簡潔な対処。
