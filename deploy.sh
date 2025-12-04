#!/bin/bash

# Vercelデプロイスクリプト

echo "🚀 AI Literacy Assessment アプリをデプロイします..."
echo ""

# Vercel CLIがインストールされているか確認
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLIがインストールされていません"
    echo "以下のコマンドでインストールしてください:"
    echo "  npm install -g vercel"
    exit 1
fi

# ビルドテスト
echo "📦 ビルドテストを実行中..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ ビルドエラーが発生しました。修正してから再度実行してください。"
    exit 1
fi

echo ""
echo "✅ ビルド成功！"
echo ""

# Vercelにデプロイ
echo "🌐 Vercelにデプロイ中..."
vercel --prod

echo ""
echo "✨ デプロイ完了！"
echo "公開URLが表示されました。そのURLをコピーして共有してください。"

