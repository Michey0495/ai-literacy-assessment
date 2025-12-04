# デプロイ手順

このアプリケーションをVercelにデプロイして公開する方法です。

## 方法1: Vercel CLIを使用（推奨・簡単）

### 1. Vercel CLIのインストール

```bash
npm install -g vercel
```

### 2. Vercelにログイン

```bash
vercel login
```

ブラウザが開き、GitHubアカウントでログインします。

### 3. プロジェクトディレクトリに移動

```bash
cd "/Users/coelaqanth_006/Desktop/01ezoai/Givery/2025/2026AS/アセスメント試験"
```

### 4. デプロイ実行

```bash
vercel
```

初回デプロイ時は以下の質問に答えます：
- Set up and deploy? → **Y**
- Which scope? → あなたのアカウントを選択
- Link to existing project? → **N**（初回は新規プロジェクト）
- What's your project's name? → プロジェクト名を入力（例: `ai-literacy-assessment`）
- In which directory is your code located? → **./**（そのままEnter）
- Want to override the settings? → **N**

### 5. 本番環境にデプロイ

```bash
vercel --prod
```

これで公開URLが表示されます！

---

## 方法2: GitHub経由でデプロイ（推奨・継続的デプロイ）

### 1. Gitリポジトリの初期化（まだの場合）

```bash
cd "/Users/coelaqanth_006/Desktop/01ezoai/Givery/2025/2026AS/アセスメント試験"
git init
git add .
git commit -m "Initial commit"
```

### 2. GitHubにリポジトリを作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `ai-literacy-assessment`）
3. PublicまたはPrivateを選択
4. 「Create repository」をクリック

### 3. GitHubにプッシュ

```bash
git remote add origin https://github.com/YOUR_USERNAME/ai-literacy-assessment.git
git branch -M main
git push -u origin main
```

### 4. Vercelでデプロイ

1. https://vercel.com にアクセス
2. 「Sign Up」または「Log In」でGitHubアカウントでログイン
3. 「Add New Project」をクリック
4. GitHubリポジトリを選択
5. プロジェクト設定：
   - Framework Preset: **Next.js**（自動検出されるはず）
   - Root Directory: **./**（そのまま）
   - Build Command: `npm run build`（自動）
   - Output Directory: `.next`（自動）
6. 「Deploy」をクリック

### 5. 完了！

デプロイが完了すると、`https://your-project-name.vercel.app` のようなURLが生成されます。

---

## 方法3: Netlifyを使用する場合

### 1. Netlify CLIのインストール

```bash
npm install -g netlify-cli
```

### 2. ログイン

```bash
netlify login
```

### 3. デプロイ

```bash
netlify deploy --prod
```

---

## 注意事項

- **環境変数**: 現在は環境変数を使用していないので、追加設定は不要です
- **カスタムドメイン**: Vercelでは無料でカスタムドメインを設定できます
- **自動デプロイ**: GitHubと連携すると、プッシュするたびに自動デプロイされます

## トラブルシューティング

### ビルドエラーが発生する場合

```bash
npm run build
```

をローカルで実行して、エラーがないか確認してください。

### フォントが読み込まれない場合

`app/globals.css`のGoogle FontsのURLが正しく読み込まれているか確認してください。

