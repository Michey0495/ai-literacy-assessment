import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '生成AIコンピテンシー・スキャン',
  description: '全30問であなたの生成AI活用力を5つの次元で分析します',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}

