# 🚀 デプロイ手順（GitHub経由）

ビルドエラーは修正済みです。以下の手順でデプロイしてください。

## ステップ1: GitHubにリポジトリを作成

1. https://github.com/new にアクセス
2. リポジトリ名を入力（例: `ai-literacy-assessment`）
3. **Public**または**Private**を選択
4. **「Initialize this repository with a README」はチェックしない**（既にコードがあるため）
5. 「Create repository」をクリック

## ステップ2: GitHubにコードをプッシュ

ターミナルで以下を実行（YOUR_USERNAMEをあなたのGitHubユーザー名に置き換えてください）：

```bash
cd "/Users/coelaqanth_006/Desktop/01ezoai/Givery/2025/2026AS/アセスメント試験"
git remote add origin https://github.com/YOUR_USERNAME/ai-literacy-assessment.git
git branch -M main
git push -u origin main
```

GitHubの認証情報を求められたら、入力してください。

## ステップ3: Vercelでデプロイ

1. https://vercel.com にアクセス
2. 「Sign Up」または「Log In」をクリック
3. **「Continue with GitHub」**をクリックしてGitHubアカウントでログイン
4. ログイン後、「Add New Project」をクリック
5. 先ほど作成したリポジトリ（`ai-literacy-assessment`）を選択
6. 「Import」をクリック
7. プロジェクト設定を確認：
   - **Framework Preset**: Next.js（自動検出）
   - **Root Directory**: `./`（そのまま）
   - **Build Command**: `npm run build`（自動）
   - **Output Directory**: `.next`（自動）
   - **Install Command**: `npm install`（自動）
8. 「Deploy」をクリック

## ステップ4: 完了！

デプロイが完了すると（1-2分）、以下のようなURLが表示されます：

```
https://ai-literacy-assessment-xxxxx.vercel.app
```

このURLをコピーして、誰でもアクセスできるようになります！

---

## 今後の更新方法

コードを更新したら、以下を実行するだけで自動的に再デプロイされます：

```bash
git add .
git commit -m "Update: 変更内容"
git push
```

Vercelが自動的に変更を検知して再デプロイします。

---

## トラブルシューティング

### GitHubへのプッシュでエラーが出る場合

認証方法を確認してください。Personal Access Tokenが必要な場合があります：
https://docs.github.com/ja/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token

### Vercelでビルドエラーが出る場合

Vercelのダッシュボードで「View Build Logs」を確認して、エラー内容を確認してください。

### その他

問題があれば、Vercelのドキュメントを参照：
https://vercel.com/docs

