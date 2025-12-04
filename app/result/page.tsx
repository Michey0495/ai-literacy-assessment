'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { questions } from '@/data/questions';
import { AnswerLog, calculateScore, getFeedback } from '@/lib/utils';
import CustomRadarChart from '@/components/RadarChart';

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const answersParam = searchParams.get('answers');
    if (!answersParam) {
      router.push('/');
      return;
    }

    try {
      const answers: AnswerLog[] = JSON.parse(decodeURIComponent(answersParam));
      const assessmentResult = calculateScore(questions, answers);
      const feedbackMessages = getFeedback(assessmentResult.categoryScores);
      
      setResult(assessmentResult);
      setFeedbacks(feedbackMessages);
    } catch (error) {
      console.error('Error parsing answers:', error);
      router.push('/');
    }
  }, [searchParams, router]);

  if (!result) {
    return (
      <div className="min-h-screen bg-paper-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ink-black border-t-transparent animate-spin mx-auto mb-6"></div>
          <p className="text-editorial-base text-gray-700">結果を読み込んでいます...</p>
        </div>
      </div>
    );
  }

  const getLevelColor = (level: number) => {
    switch (level) {
      case 4:
        return 'text-ink-black bg-paper-white border-accent-red';
      case 3:
        return 'text-ink-black bg-paper-white border-gray-800';
      case 2:
        return 'text-ink-black bg-paper-white border-gray-400';
      case 1:
        return 'text-ink-black bg-paper-white border-accent-red';
      default:
        return 'text-ink-black bg-paper-white border-gray-200';
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 4:
        return 'エキスパート';
      case 3:
        return '上級者';
      case 2:
        return '中級者';
      case 1:
        return '危険水域';
      default:
        return '';
    }
  };

  const categoryLabels: Record<string, string> = {
    'A': '原理・リテラシー',
    'B': 'プロンプト技術',
    'C': 'リスク・倫理',
    'D': '業務適用',
    'E': '創造性・高度活用',
  };

  return (
    <div className="min-h-screen bg-paper-white grain-overlay">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* ヘッダー */}
        <header className="editorial-border border-t-4 border-ink-black pt-12 mb-16">
          <div className="mb-4">
            <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
              Assessment Result
            </span>
          </div>
          <h1 className="text-editorial-5xl font-display font-black text-ink-black leading-none mb-4">
            診断結果
          </h1>
          <p className="text-editorial-lg text-gray-700">
            あなたの生成AI活用力を分析しました
          </p>
        </header>

        {/* 総合スコアとレベル - エディトリアルスタイル */}
        <section className="editorial-shadow bg-white mb-12 border-t-4 border-ink-black">
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* スコア */}
              <div>
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Total Score
                  </span>
                </div>
                <div className="flex items-baseline gap-4 mb-6">
                  <div className="text-editorial-6xl font-display font-black text-ink-black leading-none">
                    {result.totalScore}
                  </div>
                  <div className="text-editorial-xl text-gray-400">/ 100</div>
                </div>
                <div className="w-32 h-1 bg-ink-black"></div>
              </div>

              {/* レベル */}
              <div>
                <div className="mb-4">
                  <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                    Level Assessment
                  </span>
                </div>
                <div className={`inline-block px-8 py-6 border-4 ${getLevelColor(result.level)}`}>
                  <div className="text-editorial-xs font-bold tracking-widest uppercase mb-2">
                    Level {result.level}
                  </div>
                  <div className="text-editorial-3xl font-display font-black">
                    {getLevelLabel(result.level)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* レーダーチャート - エディトリアルスタイル */}
        <section className="editorial-shadow bg-white mb-12 border-t-4 border-ink-black">
          <div className="p-8 lg:p-12">
            <div className="mb-8">
              <h2 className="text-editorial-3xl font-display font-black text-ink-black mb-2">
                5つの次元での分析結果
              </h2>
              <div className="w-24 h-1 bg-accent-red"></div>
            </div>
            
            <div className="mb-12">
              <CustomRadarChart data={result.categoryScores} />
            </div>
            
            {/* カテゴリ別スコア一覧 - エディトリアルグリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {result.categoryScores.map((categoryScore: any) => (
                <div
                  key={categoryScore.category}
                  className="border-l-4 border-ink-black bg-paper-white p-6 hover:border-accent-red transition-colors duration-300"
                >
                  <div className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400 mb-2">
                    {categoryScore.category}
                  </div>
                  <div className="text-editorial-2xl font-display font-black text-ink-black mb-1">
                    {categoryScore.score}%
                  </div>
                  <div className="text-editorial-xs text-gray-600 mb-2">
                    {categoryLabels[categoryScore.category]}
                  </div>
                  <div className="text-editorial-xs text-gray-400">
                    {categoryScore.correctCount} / {categoryScore.totalCount} 問正解
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* フィードバック - エディトリアルスタイル */}
        {feedbacks.length > 0 && (
          <section className="editorial-shadow bg-white mb-12 border-t-4 border-accent-red">
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h2 className="text-editorial-3xl font-display font-black text-ink-black mb-2">
                  改善のためのアドバイス
                </h2>
                <div className="w-24 h-1 bg-accent-red"></div>
              </div>
              <div className="space-y-6">
                {feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-accent-red bg-paper-white p-6 pl-8"
                  >
                    <p className="text-editorial-base text-gray-800 leading-relaxed">
                      {feedback}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* アクションボタン - エディトリアルスタイル */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button
            onClick={() => router.push('/')}
            className="group px-10 py-4 bg-white border-4 border-ink-black text-ink-black font-bold text-editorial-base tracking-wide hover:bg-ink-black hover:text-paper-white transition-all duration-300 editorial-shadow"
          >
            <span className="flex items-center justify-center gap-3">
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              トップに戻る
            </span>
          </button>
          <button
            onClick={() => router.push('/quiz')}
            className="group px-10 py-4 bg-ink-black text-paper-white font-bold text-editorial-base tracking-wide hover:bg-accent-red transition-all duration-300 editorial-shadow"
          >
            <span className="flex items-center justify-center gap-3">
              もう一度診断する
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>

        {/* フッター */}
        <footer className="mt-16 py-8 px-6 border-t border-gray-200">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-editorial-xs text-gray-400 tracking-wide">
              制作: <span className="font-bold text-gray-600">EZOAI</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-paper-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-ink-black border-t-transparent animate-spin mx-auto mb-6"></div>
          <p className="text-editorial-base text-gray-700">結果を読み込んでいます...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  );
}
