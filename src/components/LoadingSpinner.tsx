import React from 'react';
import { Cloud, Sun, CloudRain } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative mb-8">
        {/* Animated weather icons */}
        <div className="flex space-x-4 mb-4">
          <Sun className="w-8 h-8 text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
          <Cloud className="w-8 h-8 text-blue-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
          <CloudRain className="w-8 h-8 text-indigo-500 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        
        {/* Main loading animation */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-600 rounded-full animate-spin" style={{ animationDuration: '1s' }}></div>
          <div className="absolute inset-2 w-12 h-12 border-4 border-transparent border-t-purple-600 rounded-full animate-spin" style={{ animationDuration: '0.8s', animationDirection: 'reverse' }}></div>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400 text-lg font-medium mb-2 animate-pulse">
          Loading weather data...
        </p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    </div>
  );
};