import React from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCard } from './components/ForecastCard';
import { HistoricalWeather } from './components/HistoricalWeather';
import { RealTimeIndicator } from './components/RealTimeIndicator';
import { ErrorMessage } from './components/ErrorMessage';
import { LoadingSpinner } from './components/LoadingSpinner';
import { useWeather } from './hooks/useWeather';
import { useTheme } from './hooks/useTheme';
import { getWeatherBackground } from './utils/weatherUtils';

function App() {
  const { 
    currentWeather, 
    forecast, 
    historical,
    cityImage,
    loading, 
    error, 
    units,
    lastUpdateTime,
    fetchWeatherData, 
    toggleUnits 
  } = useWeather();
  
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (city: string) => {
    fetchWeatherData(city);
  };

  const handleRetry = () => {
    if (currentWeather) {
      fetchWeatherData(currentWeather.name);
    } else {
      fetchWeatherData('London');
    }
  };

  const backgroundClass = currentWeather 
    ? getWeatherBackground(currentWeather.weather)
    : 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        units={units} 
        toggleUnits={toggleUnits} 
      />
      
      <div className={`${backgroundClass} transition-all duration-1000 relative overflow-hidden`}>
        {/* City background image overlay */}
        {cityImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 animate-fadeIn"
            style={{ backgroundImage: `url(${cityImage})` }}
          />
        )}
        
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-float"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-32 right-1/3 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="bg-black bg-opacity-30 backdrop-blur-sm relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8 animate-slideInDown">
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2 animate-glow">
                Weather Forecast
              </h2>
              <p className="text-white text-opacity-90 text-lg animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                Get real-time weather updates and comprehensive forecasts
              </p>
              
              {lastUpdateTime && (
                <div className="mt-4 flex justify-center animate-fadeIn" style={{ animationDelay: '1s' }}>
                  <RealTimeIndicator lastUpdate={lastUpdateTime} />
                </div>
              )}
            </div>
            
            <div className="animate-slideInUp" style={{ animationDelay: '0.3s' }}>
              <SearchBar onSearch={handleSearch} loading={loading} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-8 relative z-10">
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="animate-shakeX">
            <ErrorMessage message={error} onRetry={handleRetry} />
          </div>
        )}
        
        {currentWeather && !loading && !error && (
          <>
            <div className="animate-slideInUp">
              <CurrentWeather weather={currentWeather} units={units} />
            </div>
            
            {historical.length > 0 && (
              <div className="animate-slideInLeft" style={{ animationDelay: '0.2s' }}>
                <HistoricalWeather historical={historical} units={units} />
              </div>
            )}
            
            {forecast.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 animate-slideInRight" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  5-Day Forecast
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {forecast.map((day, index) => (
                    <div 
                      key={index}
                      className="animate-fadeInScale"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <ForecastCard 
                        forecast={day} 
                        units={units} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <p>
              Weather data provided by OpenWeatherMap API with real-time updates.
              <span className="block mt-1 text-sm">
                Built with React, TypeScript, and Tailwind CSS
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;