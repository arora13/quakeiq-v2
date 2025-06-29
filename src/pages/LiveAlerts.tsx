
import React, { useState, useEffect } from 'react';
import { Activity, Users, ArrowLeft, Clock, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EarthquakeReport {
  id: string;
  location: string;
  reportsCount: number;
  timestamp: string;
  intensity: 'low' | 'medium' | 'high';
  magnitude?: number;
}

export const LiveAlerts: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<EarthquakeReport[]>([]);

  useEffect(() => {
    const mockReports: EarthquakeReport[] = [
      {
        id: '1',
        location: 'Los Angeles County, CA',
        reportsCount: 234,
        timestamp: '2 minutes ago',
        intensity: 'high',
        magnitude: 4.2
      },
      {
        id: '2',
        location: 'San Francisco Bay Area, CA',
        reportsCount: 89,
        timestamp: '5 minutes ago',
        intensity: 'medium',
        magnitude: 3.8
      },
      {
        id: '3',
        location: 'San Diego County, CA',
        reportsCount: 45,
        timestamp: '12 minutes ago',
        intensity: 'low',
        magnitude: 3.1
      },
      {
        id: '4',
        location: 'Riverside County, CA',
        reportsCount: 156,
        timestamp: '8 minutes ago',
        intensity: 'high',
        magnitude: 4.0
      },
      {
        id: '5',
        location: 'Sacramento Valley, CA',
        reportsCount: 67,
        timestamp: '15 minutes ago',
        intensity: 'medium',
        magnitude: 3.5
      },
      {
        id: '6',
        location: 'Orange County, CA',
        reportsCount: 23,
        timestamp: '22 minutes ago',
        intensity: 'low',
        magnitude: 2.9
      },
      {
        id: '7',
        location: 'Fresno County, CA',
        reportsCount: 78,
        timestamp: '28 minutes ago',
        intensity: 'medium',
        magnitude: 3.6
      },
      {
        id: '8',
        location: 'Ventura County, CA',
        reportsCount: 112,
        timestamp: '35 minutes ago',
        intensity: 'high',
        magnitude: 3.9
      }
    ];
    setReports(mockReports);
  }, []);

  const getIntensityColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getIntensityTextColor = (intensity: string) => {
    switch (intensity) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-orange-600 dark:text-orange-400';
      case 'low': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="group mb-6 flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-300"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="font-medium">Back to Home</span>
          </button>

          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl shadow-lg">
                <Activity className="h-10 w-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-800 dark:from-red-400 dark:via-orange-500 dark:to-red-600 bg-clip-text text-transparent mb-4">
              Live Alert Log
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Real-time earthquake reports from California residents. Stay informed about seismic activity in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reports.reduce((sum, report) => sum + report.reportsCount, 0)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Reports</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <MapPin className="h-8 w-8 text-green-600 dark:text-green-400" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reports.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Areas</div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <Clock className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {reports.filter(r => r.timestamp.includes('minutes')).length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Recent (less than 1hr)</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center space-x-3 mb-6">
              <Activity className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Recent Activity Reports
              </h3>
            </div>

            <div className="space-y-4">
              {reports.map((report, index) => (
                <div 
                  key={report.id}
                  className="group flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl hover:from-blue-50 hover:to-blue-100 dark:hover:from-gray-600 dark:hover:to-gray-500 transition-all duration-300 transform hover:scale-102 hover:shadow-lg animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-4 h-4 ${getIntensityColor(report.intensity)} rounded-full animate-pulse`}></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="font-semibold text-gray-900 dark:text-white">{report.location}</p>
                        {report.magnitude && (
                          <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs font-medium text-gray-700 dark:text-gray-300">
                            M{report.magnitude}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400">
                        <span>{report.timestamp}</span>
                        <span className={`font-medium capitalize ${getIntensityTextColor(report.intensity)}`}>
                          {report.intensity} activity
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{report.reportsCount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">reports</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span className="text-blue-800 dark:text-blue-300 font-medium">
                  Updates every 30 seconds
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
