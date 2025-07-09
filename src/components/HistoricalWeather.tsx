import React from 'react';
import { Calendar, Thermometer, Droplets, Wind } from 'lucide-react';
import { ProcessedHistorical, Units } from '../types/weather';
import { getWeatherIcon, formatTemperature, formatWindSpeed, capitalizeWords } from '../utils/weatherUtils';

interface HistoricalWeatherProps {
  historical: ProcessedHistorical[];
  units: Units;
}

export const HistoricalWeather: React.FC<HistoricalWeatherProps> = ({ historical, units }) => {
  if (historical.length === 0) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl animate-slideInUp">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Past 5 Days Weather
        </h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {historical.map((day, index) => (
          <div 
            key={index}
            className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-4 transition-all duration-300 hover:scale-105 hover:shadow-md animate-fadeInScale"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="text-center mb-3">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {day.date}
              </p>
              <div className="text-3xl mb-2 animate-bounce" style={{ animationDelay: `${index * 200}ms` }}>
                {getWeatherIcon(day.icon)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {capitalizeWords(day.description)}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Thermometer className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Temp</span>
                </div>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatTemperature(day.temp, units)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Droplets className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Humidity</span>
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {day.humidity}%
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <Wind className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-gray-600 dark:text-gray-400">Wind</span>
                </div>
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  {formatWindSpeed(day.wind_speed, units)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};