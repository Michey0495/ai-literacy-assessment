'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { questions } from '@/data/questions';
import { AnswerLog } from '@/lib/utils';

export default function QuizPage() {
  const router = useRouter();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerLog[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswer(optionIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === currentQuestion.answer;
    const newAnswer: AnswerLog = {
      questionId: currentQuestion.id,
      selectedAnswer: selectedAnswer,
      isCorrect: isCorrect,
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const answersJson = encodeURIComponent(JSON.stringify(newAnswers));
      router.push(`/result?answers=${answersJson}`);
    }
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'A': '原理・リテラシー',
      'B': 'プロンプト技術',
      'C': 'リスク・倫理',
      'D': '業務適用',
      'E': '創造性・高度活用',
    };
    return labels[category] || category;
  };

  return (
    <div className="min-h-screen bg-paper-white grain-overlay">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* プログレスバー - エディトリアルスタイル */}
        <div className="mb-12">
          <div className="flex justify-between items-baseline mb-3">
            <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-700">
              問題 {String(currentQuestionIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}
            </span>
            <span className="text-editorial-sm font-bold text-gray-700">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="relative w-full h-1 bg-gray-200 overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-ink-black transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-accent-red opacity-20"></div>
            </div>
          </div>
        </div>

        {/* 問題カード - エディトリアルスタイル */}
        <div className="editorial-shadow bg-white mb-8 border-t-4 border-ink-black">
          <div className="p-8 lg:p-12">
            {/* カテゴリラベル */}
            <div className="mb-6">
              <span className="text-editorial-xs font-bold tracking-widest uppercase text-gray-400">
                {currentQuestion.category} — {getCategoryLabel(currentQuestion.category)}
              </span>
            </div>

            {/* 問題文 */}
            <h2 className="text-editorial-3xl font-display font-black text-ink-black mb-10 leading-tight">
              {currentQuestion.text}
            </h2>

            {/* 選択肢 - エディトリアルスタイル */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`group w-full text-left p-6 transition-all duration-200 border-l-4 ${
                    selectedAnswer === index
                      ? 'bg-ink-black text-paper-white border-accent-red editorial-shadow'
                      : 'bg-white text-ink-black border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center font-bold text-editorial-sm border-2 transition-all duration-200 ${
                      selectedAnswer === index
                        ? 'border-paper-white text-paper-white'
                        : 'border-gray-400 text-gray-400 group-hover:border-gray-600 group-hover:text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className={`text-editorial-base leading-relaxed flex-1 ${
                      selectedAnswer === index ? 'text-paper-white' : 'text-gray-800'
                    }`}>
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 次へボタン - エディトリアルスタイル */}
        <div className="flex justify-end">
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`group relative px-10 py-4 font-bold text-editorial-base tracking-wide transition-all duration-300 ${
              selectedAnswer === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-ink-black text-paper-white hover:bg-accent-red editorial-shadow'
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              {currentQuestionIndex < questions.length - 1 ? '次へ進む' : '結果を見る'}
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${selectedAnswer !== null ? 'group-hover:translate-x-1' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
