import React from 'react';
import { Sun, Moon, ToggleLeft, ToggleRight } from 'lucide-react';
import { Units } from '../types/weather';
import { Theme } from '../hooks/useTheme';

interface HeaderProps {
  theme: Theme;
  toggleTheme: () => void;
  units: Units;
  toggleUnits: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  theme, 
  toggleTheme, 
  units, 
  toggleUnits 
}) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="text-2xl">🌤️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              WeatherApp
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Units Toggle */}
            <button
              onClick={toggleUnits}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {units === 'metric' ? '°C' : '°F'}
              </span>
              {units === 'metric' ? (
                <ToggleLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <ToggleRight className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};