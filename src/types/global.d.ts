// Next.js（App Router）でimport "./globals.css";の型エラーが出る場合、TypeScriptがCSSファイルの型定義を認識していない可能性があります。
// その場合、プロジェクトのルートまたはsrcディレクトリにglobal.d.tsファイルを作成し、以下のコードを追加してCSSモジュールの型定義を提供します。
declare module "*.css";
