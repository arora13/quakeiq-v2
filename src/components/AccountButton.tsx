
import React from 'react';
import { User, LogOut, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export const AccountButton: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleAccountClick = () => {
    if (user) {
      // Show saved plans or account details
      navigate('/personal-plan');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    logout();
    navigate('/');
  };

  return (
    <div className="relative group">
      <button
        onClick={handleAccountClick}
        className="p-2 rounded-lg bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700 hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200 flex items-center space-x-2"
      >
        <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        {user && (
          <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
            {user.username}
          </span>
        )}
      </button>

      {user && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="p-2">
            <button
              onClick={() => navigate('/personal-plan')}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <FileText className="h-4 w-4" />
              <span>My Plans ({user.savedPlans.length})</span>
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
