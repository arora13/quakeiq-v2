
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Brain, FileText, Bell, Shield, Users } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: MapPin,
      title: 'Check My Risk',
      description: 'Get personalized earthquake risk assessment for your California location',
      color: 'from-blue-500 to-blue-600',
      action: () => navigate('/risk-assessment')
    },
    {
      icon: Brain,
      title: 'AI Safety Plan',
      description: 'Generate a customized emergency plan powered by AI',
      color: 'from-purple-500 to-purple-600',
      action: () => navigate('/personal-plan')
    },
    {
      icon: FileText,
      title: 'My Personal Plan',
      description: 'Create and manage your own emergency preparedness plan',
      color: 'from-green-500 to-green-600',
      action: () => navigate('/personal-plan')
    },
    {
      icon: Bell,
      title: 'Live Alert Log',
      description: 'View recent earthquake reports from California residents',
      color: 'from-orange-500 to-orange-600',
      action: () => navigate('/live-alerts')
    }
  ];

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              California Earthquake Safety.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Personalized.
              </span>{' '}
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Crowd-Powered.
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Stay prepared, stay connected, and stay safe with AI-powered emergency planning and real-time community alerts.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Monitoring</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400">AI</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Powered</div>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">CA</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Focused</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                onClick={feature.action}
                className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl border border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-300 hover:scale-105"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section */}
      <div className="px-4 pb-20">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-white/20 rounded-full">
                <Users className="h-8 w-8" />
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Join the Community
            </h2>
            
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Create an account to save your emergency plans, track earthquake activity in your area, and contribute to California's earthquake preparedness network.
            </p>
            
            <button 
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
