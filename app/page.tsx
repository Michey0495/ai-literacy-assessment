'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleStart = () => {
    router.push('/quiz');
  };

  return (
    <div className={`min-h-screen bg-paper-white grain-overlay ${mounted ? 'mounted' : ''}`}>
      {/* ヘッダーセクション - エディトリアルスタイル */}
      <header className="editorial-border pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 左側: タイトルと説明 */}
            <div className="lg:col-span-7 space-y-6 stagger-animation stagger-1">
              <div className="inline-block">
                <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-700">
                  Assessment Tool
                </span>
              </div>
              <h1 className="text-editorial-5xl lg:text-editorial-6xl font-display font-black text-ink-black leading-none">
                生成AI
                <br />
                <span className="text-accent-red">コンピテンシー</span>
                <br />
                スキャン
              </h1>
              <p className="text-editorial-lg text-gray-700 max-w-xl leading-relaxed">
                全30問であなたの生成AI活用力を5つの次元で分析します。
                所要時間は約10〜15分です。
              </p>
            </div>

            {/* 右側: 開始ボタン */}
            <div className="lg:col-span-5 lg:pl-12 stagger-animation stagger-2">
              <button
                onClick={handleStart}
                className="group relative w-full lg:w-auto px-12 py-5 bg-ink-black text-paper-white font-bold text-editorial-lg tracking-wide transition-all duration-300 hover:bg-accent-red editorial-shadow"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  診断を開始する
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span className="absolute inset-0 bg-accent-red opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 5つの次元セクション - エディトリアルグリッド */}
      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 stagger-animation stagger-2">
            <h2 className="text-editorial-3xl font-display font-black text-ink-black mb-2">
              5つの分析次元
            </h2>
            <div className="w-24 h-1 bg-accent-red"></div>
          </div>

          {/* 非対称グリッドレイアウト */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* カテゴリ1 - 大きく表示 */}
            <div className="lg:col-span-2 stagger-animation stagger-3">
              <div className="editorial-shadow bg-white p-8 h-full border-l-4 border-ink-black hover:border-accent-red transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Category A
                  </span>
                </div>
                <h3 className="text-editorial-2xl font-display font-black text-ink-black mb-3">
                  原理・リテラシー
                </h3>
                <p className="text-editorial-base text-gray-700 leading-relaxed">
                  AIの基本的な仕組みと動作原理の理解度を測定します。大規模言語モデルの出力メカニズム、ハルシネーションのリスク、トークンやRAGなどの概念を理解しているかを評価します。
                </p>
              </div>
            </div>

            {/* カテゴリ2 */}
            <div className="stagger-animation stagger-3">
              <div className="editorial-shadow bg-white p-8 h-full border-l-4 border-ink-black hover:border-accent-red transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Category B
                  </span>
                </div>
                <h3 className="text-editorial-xl font-display font-black text-ink-black mb-3">
                  プロンプト技術
                </h3>
                <p className="text-editorial-sm text-gray-700 leading-relaxed">
                  効果的な指示の出し方とプロンプトエンジニアリングのスキルを評価します。
                </p>
              </div>
            </div>

            {/* カテゴリ3 */}
            <div className="stagger-animation stagger-4">
              <div className="editorial-shadow bg-white p-8 h-full border-l-4 border-ink-black hover:border-accent-red transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Category C
                  </span>
                </div>
                <h3 className="text-editorial-xl font-display font-black text-ink-black mb-3">
                  リスク・倫理
                </h3>
                <p className="text-editorial-sm text-gray-700 leading-relaxed">
                  セキュリティ、情報漏洩、バイアスなどのリスク管理能力を確認します。
                </p>
              </div>
            </div>

            {/* カテゴリ4 */}
            <div className="stagger-animation stagger-4">
              <div className="editorial-shadow bg-white p-8 h-full border-l-4 border-ink-black hover:border-accent-red transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Category D
                  </span>
                </div>
                <h3 className="text-editorial-xl font-display font-black text-ink-black mb-3">
                  業務適用
                </h3>
                <p className="text-editorial-sm text-gray-700 leading-relaxed">
                  実際の業務プロセスへのAI活用方法の理解度を測定します。
                </p>
              </div>
            </div>

            {/* カテゴリ5 - 大きく表示 */}
            <div className="lg:col-span-2 stagger-animation stagger-5">
              <div className="editorial-shadow bg-white p-8 h-full border-l-4 border-ink-black hover:border-accent-red transition-colors duration-300">
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Category E
                  </span>
                </div>
                <h3 className="text-editorial-2xl font-display font-black text-ink-black mb-3">
                  創造性・高度活用
                </h3>
                <p className="text-editorial-base text-gray-700 leading-relaxed">
                  マルチモーダルAIやAPI連携など、高度な活用スキルを評価します。画像認識、データ分析、テンプレート化、API連携などの実践的な応用能力を測定します。
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="editorial-border border-t-2 border-ink-black mt-16 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-editorial-xs text-gray-400 tracking-wide mb-2">
            © 2025 AI Literacy Assessment. All rights reserved.
          </p>
          <p className="text-editorial-xs text-gray-600 tracking-wide">
            制作: <span className="font-bold">EZOAI</span>
          </p>
        </div>
      </footer>

    </div>
  );
}
