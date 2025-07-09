import React from 'react';
import { Thermometer, Droplets, Wind, Eye, Sunrise, Sunset, Gauge } from 'lucide-react';
import { CurrentWeatherResponse, Units } from '../types/weather';
import { 
  getWeatherIcon, 
  formatTemperature, 
  formatWindSpeed, 
  formatTime, 
  capitalizeWords 
} from '../utils/weatherUtils';

interface CurrentWeatherProps {
  weather: CurrentWeatherResponse;
  units: Units;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weather, units }) => {
  const weatherIcon = getWeatherIcon(weather.weather[0].icon);
  const description = capitalizeWords(weather.weather[0].description);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
        <div className="text-right">
          <div className="text-6xl mb-2">{weatherIcon}</div>
          <div className="text-4xl font-bold text-gray-900 dark:text-white">
            {formatTemperature(weather.main.temp, units)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <Thermometer className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Feels like</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatTemperature(weather.main.feels_like, units)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <Droplets className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
            <p className="font-semibold text-gray-900 dark:text-white">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <Wind className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatWindSpeed(weather.wind.speed, units)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {Math.round(weather.visibility / 1000)} km
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center space-x-2 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <Sunrise className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sunrise</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatTime(weather.sys.sunrise)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <Sunset className="w-5 h-5 text-red-600 dark:text-red-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Sunset</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {formatTime(weather.sys.sunset)}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
            <p className="font-semibold text-gray-900 dark:text-white">
              {weather.main.pressure} hPa
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Temperature Range</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatTemperature(weather.main.temp_min, units)} - {formatTemperature(weather.main.temp_max, units)}
          </span>
        </div>
      </div>
    </div>
  );
};