
import React from 'react';
import { Activity } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { AccountButton } from './AccountButton';

export const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg">
            <Activity className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
            QuakeIQ
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <AccountButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
