
import React, { useState } from 'react';
import { MapPin, Search, AlertTriangle, ArrowLeft, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuakeScoreDisplay } from '@/components/QuakeScoreDisplay';

interface EarthquakeData {
  magnitude: number;
  location: string;
  time: string;
  depth: number;
  distance: number;
}

export const RiskAssessment: React.FC = () => {
  const navigate = useNavigate();
  const [zipCode, setZipCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [quakeScore, setQuakeScore] = useState<number | null>(null);
  const [recentQuakes, setRecentQuakes] = useState<EarthquakeData[]>([]);
  const [error, setError] = useState('');

  const validateZipCode = (zip: string): boolean => {
    // California ZIP codes generally start with 9
    const caZipPattern = /^9[0-6]\d{3}$/;
    return caZipPattern.test(zip);
  };

  const assessRisk = async () => {
    if (!validateZipCode(zipCode)) {
      setError('Please enter a valid California ZIP code (90000-96999)');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Mock data for demonstration - in real app, would fetch from USGS API
      setTimeout(() => {
        const mockScore = Math.random() * 10;
        const mockQuakes: EarthquakeData[] = [
          {
            magnitude: 2.3,
            location: 'Near ' + zipCode,
            time: '2 hours ago',
            depth: 8.5,
            distance: 12.3
          },
          {
            magnitude: 1.8,
            location: 'San Andreas Fault',
            time: '1 day ago',
            depth: 15.2,
            distance: 25.7
          },
          {
            magnitude: 3.1,
            location: 'Hayward Fault',
            time: '3 days ago',
            depth: 6.8,
            distance: 45.2
          }
        ];

        setQuakeScore(mockScore);
        setRecentQuakes(mockQuakes);
        setIsLoading(false);
      }, 1500);
    } catch (err) {
      setError('Failed to fetch earthquake data. Please try again.');
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 animate-fade-in">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <button
            onClick={handleBackToHome}
            className="group mb-6 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300 hover:translate-x-1"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </button>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg animate-pulse-slow">
                <MapPin className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 dark:from-blue-400 dark:via-blue-500 dark:to-blue-600 bg-clip-text text-transparent mb-4 animate-fade-in">
              Earthquake Risk Assessment
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Enter your California ZIP code to get a personalized earthquake risk assessment and recent seismic activity in your area.
            </p>
          </div>

          {/* ZIP Code Input */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 mb-8 animate-fade-in hover:shadow-3xl transition-all duration-500" style={{ animationDelay: '0.3s' }}>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1">
                <label htmlFor="zipcode" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  California ZIP Code
                </label>
                <input
                  id="zipcode"
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value.slice(0, 5))}
                  placeholder="e.g., 90210"
                  className="w-full px-6 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-lg transition-all duration-300 hover:border-blue-400 dark:hover:border-blue-500"
                  maxLength={5}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={assessRisk}
                  disabled={isLoading || !zipCode}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-6 w-6" />
                      <span>Assess Risk</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            
            {error && (
              <div className="mt-6 p-4 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl flex items-center space-x-3 animate-fade-in">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 animate-pulse" />
                <span className="text-red-700 dark:text-red-300 font-medium">{error}</span>
              </div>
            )}
          </div>

          {/* Results */}
          {quakeScore !== null && (
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {/* QuakeScore Display */}
              <div className="transform hover:scale-105 transition-transform duration-300">
                <QuakeScoreDisplay score={quakeScore} location={zipCode} />
              </div>

              {/* Recent Earthquakes */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-3xl transition-all duration-500">
                <div className="flex items-center space-x-3 mb-6">
                  <Activity className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Recent Seismic Activity
                  </h3>
                </div>
                <div className="space-y-4">
                  {recentQuakes.map((quake, index) => (
                    <div 
                      key={index} 
                      className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-102 hover:shadow-lg animate-fade-in"
                      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            M{quake.magnitude}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">•</span>
                          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                            {quake.distance}km away
                          </span>
                        </div>
                        <p className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                          {quake.location} • {quake.time}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Depth: {quake.depth}km
                        </p>
                      </div>
                      <div className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
