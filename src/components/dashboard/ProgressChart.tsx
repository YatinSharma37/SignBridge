import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ActivityData {
  day: string;
  minutes: number;
}

interface ProgressChartProps {
  data: ActivityData[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  return (
    <div className="w-full h-72 bg-white rounded-xl shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Activity</h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value}m`}
          />
          <Tooltip
            formatter={(value) => [`${value} minutes`, 'Learning Time']}
            labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            }}
          />
          <Bar 
            dataKey="minutes" 
            fill="#3B82F6" 
            radius={[4, 4, 0, 0]}
            animationDuration={1000}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressChart;