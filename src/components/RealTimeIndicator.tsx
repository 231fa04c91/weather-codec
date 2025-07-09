import React from 'react';
import { Clock, Wifi } from 'lucide-react';

interface RealTimeIndicatorProps {
  lastUpdate: Date | null;
}

export const RealTimeIndicator: React.FC<RealTimeIndicatorProps> = ({ lastUpdate }) => {
  const formatLastUpdate = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 bg-green-50 dark:bg-green-900/20 px-3 py-2 rounded-lg animate-pulse">
      <div className="flex items-center space-x-1">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <Wifi className="w-4 h-4 text-green-600 dark:text-green-400" />
        <span className="font-medium text-green-700 dark:text-green-300">Live</span>
      </div>
      {lastUpdate && (
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>Updated: {formatLastUpdate(lastUpdate)}</span>
        </div>
      )}
    </div>
  );
};