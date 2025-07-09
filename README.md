# WeatherApp - Comprehensive Weather Forecast Application

A beautiful, responsive weather application built with React, TypeScript, and Tailwind CSS that provides real-time weather data and 5-day forecasts using the OpenWeatherMap API.

## Features

### Core Functionality
- **Real-time Weather Data**: Get current weather conditions for any city worldwide
- **5-Day Forecast**: Detailed daily forecasts with temperature ranges, humidity, wind speed, and precipitation probability
- **Location Search**: Search for cities with autocomplete suggestions
- **Unit Conversion**: Toggle between Celsius/Fahrenheit and metric/imperial units
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Advanced Features
- **Dark/Light Mode**: Full theme switching with system preference detection
- **Caching System**: 15-minute cache for API responses to minimize requests
- **Weather-Responsive UI**: Background colors and themes that adapt to current weather conditions
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Loading States**: Beautiful loading animations and spinners
- **Local Storage**: Remembers user preferences and cached data

### Technical Implementation
- **TypeScript**: Full type safety throughout the application
- **React Hooks**: Custom hooks for weather data and theme management
- **Modular Architecture**: Well-organized components and services
- **API Integration**: Robust OpenWeatherMap API integration with error handling
- **Performance Optimized**: Efficient data fetching and caching strategies

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Get your API key from [OpenWeatherMap](https://openweathermap.org/api)

4. Replace the demo API key in `src/services/weatherService.ts`:
   ```typescript
   private readonly API_KEY = 'your_actual_api_key_here';
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5173`

## API Integration

The application integrates with OpenWeatherMap's APIs:

### Current Weather API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/weather`
- **Parameters**: city name, API key, units (metric/imperial)
- **Response**: Current weather conditions, temperature, humidity, wind, etc.

### 5-Day Forecast API
- **Endpoint**: `https://api.openweathermap.org/data/2.5/forecast`
- **Parameters**: city name, API key, units (metric/imperial)
- **Response**: 5-day forecast with 3-hour intervals

### Error Handling
The application handles various API errors:
- **404**: City not found
- **401**: Invalid API key
- **429**: Rate limit exceeded
- **Network errors**: Connection issues

## Architecture

### Component Structure
```
src/
├── components/
│   ├── Header.tsx              # App header with theme/unit toggles
│   ├── SearchBar.tsx           # City search with autocomplete
│   ├── CurrentWeather.tsx      # Current weather display
│   ├── ForecastCard.tsx        # Individual forecast day card
│   ├── ErrorMessage.tsx        # Error display component
│   └── LoadingSpinner.tsx      # Loading animation
├── hooks/
│   ├── useWeather.ts           # Weather data management
│   └── useTheme.ts             # Theme management
├── services/
│   └── weatherService.ts       # API integration service
├── types/
│   └── weather.ts              # TypeScript type definitions
├── utils/
│   └── weatherUtils.ts         # Utility functions
└── App.tsx                     # Main application component
```

### Key Features

#### Caching System
- **Duration**: 15-minute cache timeout
- **Storage**: localStorage for persistence
- **Invalidation**: Automatic cache invalidation on unit changes
- **Error Handling**: Graceful fallback when cache is corrupted

#### Theme System
- **Auto-detection**: Respects system dark/light mode preference
- **Persistence**: Saves user's theme choice to localStorage
- **Smooth Transitions**: CSS transitions for theme changes
- **Comprehensive**: Dark mode styles for all components

#### Weather-Responsive Design
- **Dynamic Backgrounds**: Changes based on current weather conditions
- **Weather Icons**: Emoji-based weather icons for better visual appeal
- **Adaptive Colors**: UI colors that complement weather conditions

## Customization

### Adding New Weather Providers
The service layer is designed to be extensible. To add a new weather provider:

1. Create a new service class implementing similar methods
2. Update the type definitions if needed
3. Modify the utility functions for data processing
4. Update the service injection in hooks

### Styling Customization
- **Tailwind Configuration**: Modify `tailwind.config.js` for custom colors/spacing
- **Component Styles**: Individual component styling can be customized
- **Theme Colors**: Update the color system in utility functions

## Performance Considerations

### Optimization Strategies
- **API Caching**: Reduces redundant API calls
- **Lazy Loading**: Components load only when needed
- **Debounced Search**: Prevents excessive API calls during typing
- **Efficient Re-renders**: Proper React optimization techniques

### Bundle Size
- **Tree Shaking**: Unused code is automatically removed
- **Icon Optimization**: Only used Lucide icons are included
- **CSS Purging**: Unused Tailwind classes are removed in production

## Browser Support

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **Mobile Browsers**: iOS Safari, Chrome Mobile, Firefox Mobile
- **Features**: Uses modern web APIs with graceful fallbacks

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **OpenWeatherMap**: For providing the weather API
- **Lucide React**: For the beautiful icon set
- **Tailwind CSS**: For the utility-first CSS framework
- **React**: For the component-based architecture