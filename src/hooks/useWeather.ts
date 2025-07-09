import { useState, useEffect, useCallback } from 'react';
import { CurrentWeatherResponse, ForecastResponse, ProcessedForecast, ProcessedHistorical, Units, HistoricalWeatherResponse } from '../types/weather';
import { weatherService } from '../services/weatherService';
import { processForecastData, processHistoricalData } from '../utils/weatherUtils';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResponse | null>(null);
  const [forecast, setForecast] = useState<ProcessedForecast[]>([]);
  const [historical, setHistorical] = useState<ProcessedHistorical[]>([]);
  const [cityImage, setCityImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<Units>('metric');
  const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

  const fetchWeatherData = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch current weather and forecast first
      const [currentData, forecastData] = await Promise.all([
        weatherService.getCurrentWeather(city, units),
        weatherService.getForecast(city, units)
      ]);
      
      setCurrentWeather(currentData);
      setForecast(processForecastData(forecastData.list));
      setLastUpdateTime(new Date());

      // Fetch city background image (non-blocking)
      weatherService.getCityImage(city)
        .then(imageUrl => setCityImage(imageUrl))
        .catch(imgError => {
          console.error('Failed to load city image:', imgError);
          setCityImage('');
        });

      // Fetch historical data (non-blocking)
      weatherService.getHistoricalWeather(
        currentData.coord.lat, 
        currentData.coord.lon, 
        units
      )
        .then(historicalData => setHistorical(processHistoricalData(historicalData)))
        .catch(histError => {
          console.error('Failed to load historical data:', histError);
          setHistorical([]);
        });
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setCurrentWeather(null);
      setForecast([]);
      setHistorical([]);
      setCityImage('');
    } finally {
      setLoading(false);
    }
  }, [units]);

  const toggleUnits = useCallback(() => {
    const newUnits = units === 'metric' ? 'imperial' : 'metric';
    setUnits(newUnits);
    
    // Refetch data with new units if we have current weather
    if (currentWeather) {
      fetchWeatherData(currentWeather.name);
    }
  }, [units, currentWeather, fetchWeatherData]);

  // Real-time updates every 10 minutes
  useEffect(() => {
    if (!currentWeather) return;

    const interval = setInterval(() => {
      fetchWeatherData(currentWeather.name);
    }, 10 * 60 * 1000); // 10 minutes

    return () => clearInterval(interval);
  }, [currentWeather, fetchWeatherData]);

  useEffect(() => {
    // Load default city on mount
    fetchWeatherData('London');
  }, []);

  return {
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
  };
};