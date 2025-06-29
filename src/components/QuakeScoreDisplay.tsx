
import React from 'react';

interface QuakeScoreDisplayProps {
  score: number;
  location: string;
}

export const QuakeScoreDisplay: React.FC<QuakeScoreDisplayProps> = ({ score, location }) => {
  const getRiskLevel = (score: number) => {
    if (score <= 3) return { level: 'Low', color: 'text-green-600 dark:text-green-400', bgColor: 'bg-green-100 dark:bg-green-900/30' };
    if (score <= 6) return { level: 'Moderate', color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/30' };
    if (score <= 8) return { level: 'High', color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' };
    return { level: 'Very High', color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' };
  };

  const risk = getRiskLevel(score);
  const percentage = (score / 10) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          QuakeScore for {location}
        </h3>
        <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
          {score.toFixed(1)}
        </div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${risk.color} ${risk.bgColor}`}>
          {risk.level} Risk
        </div>
      </div>
      
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
        <div 
          className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        Based on historical seismic activity and geological factors
      </p>
    </div>
  );
};
