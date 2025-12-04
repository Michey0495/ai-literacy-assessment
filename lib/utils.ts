import { Question } from '@/data/questions';

export interface AnswerLog {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface CategoryScore {
  category: string;
  score: number;
  correctCount: number;
  totalCount: number;
}

export interface AssessmentResult {
  totalScore: number;
  level: number;
  levelLabel: string;
  categoryScores: CategoryScore[];
}

export function calculateScore(questions: Question[], answers: AnswerLog[]): AssessmentResult {
  const categoryStats: Record<string, { correct: number; total: number }> = {
    'A': { correct: 0, total: 0 },
    'B': { correct: 0, total: 0 },
    'C': { correct: 0, total: 0 },
    'D': { correct: 0, total: 0 },
    'E': { correct: 0, total: 0 },
  };

  // 各カテゴリの正解数をカウント
  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (question) {
      categoryStats[question.category].total++;
      if (answer.isCorrect) {
        categoryStats[question.category].correct++;
      }
    }
  });

  // カテゴリごとのスコアを計算（各カテゴリ6問なので、正解数/6*100）
  const categoryScores: CategoryScore[] = Object.entries(categoryStats).map(
    ([category, stats]) => ({
      category,
      score: Math.round((stats.correct / stats.total) * 100),
      correctCount: stats.correct,
      totalCount: stats.total,
    })
  );

  // 総合スコアを計算（全問の正解率）
  const totalCorrect = answers.filter((a) => a.isCorrect).length;
  const totalScore = Math.round((totalCorrect / questions.length) * 100);

  // レベル判定
  let level: number;
  let levelLabel: string;
  if (totalScore >= 90) {
    level = 4;
    levelLabel = 'エキスパート';
  } else if (totalScore >= 70) {
    level = 3;
    levelLabel = '上級者';
  } else if (totalScore >= 50) {
    level = 2;
    levelLabel = '中級者';
  } else {
    level = 1;
    levelLabel = '危険水域';
  }

  return {
    totalScore,
    level,
    levelLabel,
    categoryScores,
  };
}

export function getFeedback(categoryScores: CategoryScore[]): string[] {
  const feedbacks: string[] = [];
  const categoryLabels: Record<string, string> = {
    'A': '原理・リテラシー',
    'B': 'プロンプト技術',
    'C': 'リスク・倫理',
    'D': '業務適用',
    'E': '創造性・高度活用',
  };

  const feedbackMessages: Record<string, Record<number, string>> = {
    'A': {
      0: '生成AIの基本的な仕組みを理解することが重要です。LLMがどのように動作するか、ハルシネーションのリスクなどを学びましょう。',
      50: '生成AIの原理について基礎的な理解があります。より深い知識を身につけることで、適切な活用が可能になります。',
    },
    'B': {
      0: 'プロンプトエンジニアリングの基礎を学びましょう。役割設定、Few-Shot、Chain of Thoughtなどの技術を習得することで、AIの出力品質が向上します。',
      50: 'プロンプト技術の基礎は理解できています。より高度なテクニックを学び、実践を通じてスキルを向上させましょう。',
    },
    'C': {
      0: 'AI利用におけるリスクと倫理について、セキュリティガイドラインや情報漏洩リスク、著作権、バイアスなどの重要な課題を学ぶ必要があります。',
      50: 'リスク管理の基礎は理解できています。より実践的なケーススタディを通じて、安全なAI活用を身につけましょう。',
    },
    'D': {
      0: '業務でのAI活用方法を学びましょう。議事録作成、アイデア出し、データ分析など、具体的な業務プロセスへの適用方法を理解することが重要です。',
      50: '業務適用の基礎は理解できています。実際の業務でAIを活用し、効率化と品質向上を実現する方法を探求しましょう。',
    },
    'E': {
      0: 'AIの高度な活用方法を学びましょう。マルチモーダルAI、API連携、テンプレート化など、より創造的で効率的な活用方法を習得することが重要です。',
      50: '高度活用の基礎は理解できています。継続的な学習と実践を通じて、AIの可能性を最大限に引き出しましょう。',
    },
  };

  categoryScores.forEach((categoryScore) => {
    if (categoryScore.score < 50) {
      const feedback = feedbackMessages[categoryScore.category]?.[0] || '';
      if (feedback) {
        feedbacks.push(`【${categoryLabels[categoryScore.category]}】${feedback}`);
      }
    } else if (categoryScore.score < 70) {
      const feedback = feedbackMessages[categoryScore.category]?.[50] || '';
      if (feedback) {
        feedbacks.push(`【${categoryLabels[categoryScore.category]}】${feedback}`);
      }
    }
  });

  return feedbacks;
}

