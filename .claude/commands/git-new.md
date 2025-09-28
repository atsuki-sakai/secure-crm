# 命令: 作業開始のため、基準ブランチを最新化し、feat/<ISSUE_NUMBER> を新規作成してチェックアウトする。

# 変数
{{ BASE_BRANCH }}
{{ ISSUE_NUMBER }} <数字のみ 例: 123>

# 実行方針（運用準拠）
- すべての作業はIssue起点。ブランチ名は feat/<ISSUE_NUMBER>。
- pullはFast-forwardのみを許可（事故防止）。
- 1日の作業終了時はpush必須。

# 手順
1. 作業ディレクトリへ移動する。
2. 作業ツリーがクリーンであることを確認。差分がある場合は中断し、コミット/スタッシュを案内。
3. pullの挙動をFFのみへ設定:
   `git config pull.ff only`
4. 追跡元を最新化:
   `git fetch --all --prune`
5. 基準ブランチをチェックアウトして最新取得:
   `git switch "${BASE_BRANCH}" && git pull`
6. 新ブランチ作成:
   `git switch -c "feat/${ISSUE_NUMBER}"`
7. 初回pushでアップストリーム紐付け:
   `git push -u origin "feat/${ISSUE_NUMBER}"`

# 期待出力
- 実行ログ（各コマンドの標準出力）。
- 失敗時は「原因／対処」を短く提示（例: 未コミット差分あり→コミット指示）。
