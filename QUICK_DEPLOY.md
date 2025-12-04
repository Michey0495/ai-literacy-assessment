# 🚀 クイックデプロイガイド

このアプリを**5分で公開**する手順です。

## 最も簡単な方法：Vercel CLI

### ステップ1: Vercel CLIをインストール

```bash
npm install -g vercel
```

### ステップ2: ログイン

```bash
vercel login
```

ブラウザが開くので、GitHubアカウントでログインしてください。

### ステップ3: デプロイ実行

プロジェクトディレクトリで以下を実行：

```bash
cd "/Users/coelaqanth_006/Desktop/01ezoai/Givery/2025/2026AS/アセスメント試験"
vercel --prod
```

または、スクリプトを使用：

```bash
./deploy.sh
```

### 完了！

デプロイが完了すると、以下のようなURLが表示されます：
```
https://ai-literacy-assessment-xxxxx.vercel.app
```

このURLを誰でもアクセスできるようになります！

---

## 別の方法：GitHub経由（推奨・自動デプロイ）

### ステップ1: GitHubにリポジトリを作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `ai-literacy-assessment`）
3. 「Create repository」をクリック

### ステップ2: コードをプッシュ

```bash
cd "/Users/coelaqanth_006/Desktop/01ezoai/Givery/2025/2026AS/アセスメント試験"
git remote add origin https://github.com/YOUR_USERNAME/ai-literacy-assessment.git
git branch -M main
git push -u origin main
```

### ステップ3: Vercelでデプロイ

1. https://vercel.com にアクセス
2. 「Add New Project」をクリック
3. GitHubリポジトリを選択
4. 「Deploy」をクリック

**これで完了！** 今後、GitHubにプッシュするたびに自動的にデプロイされます。

---

## トラブルシューティング

### ビルドエラーが出る場合

```bash
npm run build
```

を実行して、エラーを確認してください。

### フォントが表示されない場合

Google FontsのURLが正しく読み込まれているか確認してください。
`app/globals.css`のフォントインポートを確認してください。

### その他の問題

詳細は `DEPLOY.md` を参照してください。

