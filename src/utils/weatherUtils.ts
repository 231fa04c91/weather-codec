import { WeatherData, ProcessedForecast, ForecastItem, Units, HistoricalWeatherResponse, ProcessedHistorical } from '../types/weather';

export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: { [key: string]: string } = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌦️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '🌨️', '13n': '🌨️',
    '50d': '🌫️', '50n': '🌫️'
  };
  return iconMap[iconCode] || '🌤️';
};

export const getWeatherBackground = (weather: WeatherData[]): string => {
  const mainWeather = weather[0]?.main.toLowerCase();
  
  switch (mainWeather) {
    case 'clear':
      return 'bg-gradient-to-br from-amber-400 via-orange-500 to-red-500';
    case 'clouds':
      return 'bg-gradient-to-br from-gray-400 via-gray-500 to-slate-600';
    case 'rain':
      return 'bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800';
    case 'thunderstorm':
      return 'bg-gradient-to-br from-purple-600 via-purple-800 to-gray-900';
    case 'snow':
      return 'bg-gradient-to-br from-blue-200 via-cyan-300 to-blue-400';
    case 'mist':
    case 'fog':
      return 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500';
    default:
      return 'bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600';
  }
};

export const formatTemperature = (temp: number, units: Units): string => {
  const rounded = Math.round(temp);
  const unit = units === 'metric' ? '°C' : '°F';
  return `${rounded}${unit}`;
};

export const formatWindSpeed = (speed: number, units: Units): string => {
  const unit = units === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed)} ${unit}`;
};

export const formatDate = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const processForecastData = (forecastData: ForecastItem[]): ProcessedForecast[] => {
  const dailyData: { [key: string]: ForecastItem[] } = {};
  
  // Group forecast items by date
  forecastData.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = [];
    }
    dailyData[date].push(item);
  });

  // Process each day
  return Object.entries(dailyData)
    .slice(0, 5) // 5-day forecast
    .map(([date, items]) => {
      const temps = items.map(item => item.main.temp);
      const temp_min = Math.min(...temps);
      const temp_max = Math.max(...temps);
      
      // Use the weather from the middle of the day (around noon)
      const middayItem = items.find(item => {
        const hour = new Date(item.dt * 1000).getHours();
        return hour >= 12 && hour <= 15;
      }) || items[0];
      
      const avgHumidity = items.reduce((sum, item) => sum + item.main.humidity, 0) / items.length;
      const avgWindSpeed = items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length;
      const maxPrecipitation = Math.max(...items.map(item => item.pop));

      return {
        date: formatDate(middayItem.dt),
        temp_min,
        temp_max,
        description: middayItem.weather[0].description,
        icon: middayItem.weather[0].icon,
        humidity: Math.round(avgHumidity),
        wind_speed: avgWindSpeed,
        precipitation: Math.round(maxPrecipitation * 100)
      };
    });
};

export const processHistoricalData = (historicalData: HistoricalWeatherResponse[]): ProcessedHistorical[] => {
  return historicalData.map(dayData => {
    const data = dayData.data[0];
    return {
      date: formatDate(data.dt),
      temp: data.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.humidity,
      wind_speed: data.wind_speed
    };
  });
};

export const capitalizeWords = (str: string): string => {
  return str.replace(/\b\w/g, l => l.toUpperCase());
};