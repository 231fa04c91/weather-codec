import React from 'react';
import { Droplets, Wind } from 'lucide-react';
import { ProcessedForecast, Units } from '../types/weather';
import { getWeatherIcon, formatTemperature, formatWindSpeed, capitalizeWords } from '../utils/weatherUtils';

interface ForecastCardProps {
  forecast: ProcessedForecast;
  units: Units;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ forecast, units }) => {
  const weatherIcon = getWeatherIcon(forecast.icon);
  const description = capitalizeWords(forecast.description);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="text-center mb-3">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
          {forecast.date}
        </p>
        <div className="text-4xl mb-2">{weatherIcon}</div>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">High</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatTemperature(forecast.temp_max, units)}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatTemperature(forecast.temp_min, units)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Droplets className="w-3 h-3 text-blue-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Rain</span>
          </div>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {forecast.precipitation}%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Wind className="w-3 h-3 text-green-500" />
            <span className="text-xs text-gray-600 dark:text-gray-400">Wind</span>
          </div>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {formatWindSpeed(forecast.wind_speed, units)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-600 dark:text-gray-400">Humidity</span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">
            {forecast.humidity}%
          </span>
        </div>
      </div>
    </div>
  );
};