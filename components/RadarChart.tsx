'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { CategoryScore } from '@/lib/utils';
import { categoryLabels } from '@/data/questions';

interface RadarChartProps {
  data: CategoryScore[];
}

export default function CustomRadarChart({ data }: RadarChartProps) {
  const chartData = data.map((item) => ({
    category: categoryLabels[item.category] || item.category,
    score: item.score,
    fullMark: 100,
  }));

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={chartData}>
          <PolarGrid 
            stroke="#e5e5e5" 
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <PolarAngleAxis
            dataKey="category"
            tick={{ 
              fill: '#0a0a0a', 
              fontSize: 13, 
              fontWeight: 700,
              fontFamily: 'Zen Kaku Gothic New, sans-serif',
            }}
            className="font-display"
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ 
              fill: '#a3a3a3', 
              fontSize: 11,
              fontWeight: 500,
            }}
            tickCount={6}
            stroke="#a3a3a3"
          />
          <Radar
            name="スコア"
            dataKey="score"
            stroke="#0a0a0a"
            fill="#c41e3a"
            fillOpacity={0.15}
            strokeWidth={3}
            dot={{ fill: '#c41e3a', r: 4 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
