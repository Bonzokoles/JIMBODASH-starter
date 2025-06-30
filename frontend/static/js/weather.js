// JIMBODASH Weather Module

class WeatherModule {
    constructor() {
        this.weatherInfo = document.getElementById('weather-info');
        this.refreshButton = document.getElementById('refresh-weather');
        this.init();
    }

    init() {
        console.log('Weather module initializing...');
        this.setupEventListeners();
        this.loadWeather();
    }

    setupEventListeners() {
        if (this.refreshButton) {
            this.refreshButton.addEventListener('click', () => this.loadWeather());
        }
    }

    async loadWeather(city = 'Warsaw') {
        try {
            this.setLoading(true);
            
            const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            this.updateWeatherDisplay(data);
        } catch (error) {
            console.error('Weather error:', error);
            this.showError(error.message);
        } finally {
            this.setLoading(false);
        }
    }

    updateWeatherDisplay(data) {
        // Update temperature
        const tempElement = document.getElementById('weather-temp');
        if (tempElement && data.main) {
            tempElement.textContent = `${Math.round(data.main.temp)}°C`;
        }

        // Update description
        const descElement = document.getElementById('weather-desc');
        if (descElement && data.weather && data.weather[0]) {
            descElement.textContent = data.weather[0].description;
        }

        // Update city
        const cityElement = document.getElementById('weather-city');
        if (cityElement && data.name) {
            cityElement.textContent = data.name;
        }

        // Update weather icon
        const iconElement = document.querySelector('.weather-icon i');
        if (iconElement && data.weather && data.weather[0]) {
            const iconClass = this.getWeatherIcon(data.weather[0].main, data.weather[0].icon);
            iconElement.className = iconClass;
        }
    }

    getWeatherIcon(weatherMain, iconCode) {
        const iconMap = {
            'Clear': 'fas fa-sun fa-3x text-warning',
            'Clouds': 'fas fa-cloud fa-3x text-secondary',
            'Rain': 'fas fa-cloud-rain fa-3x text-primary',
            'Drizzle': 'fas fa-cloud-rain fa-3x text-info',
            'Thunderstorm': 'fas fa-bolt fa-3x text-warning',
            'Snow': 'fas fa-snowflake fa-3x text-light',
            'Mist': 'fas fa-smog fa-3x text-secondary',
            'Fog': 'fas fa-smog fa-3x text-secondary'
        };

        return iconMap[weatherMain] || 'fas fa-question fa-3x text-muted';
    }

    setLoading(isLoading) {
        if (this.refreshButton) {
            this.refreshButton.disabled = isLoading;
            const icon = this.refreshButton.querySelector('i');
            if (icon) {
                if (isLoading) {
                    icon.className = 'fas fa-spinner fa-spin';
                } else {
                    icon.className = 'fas fa-sync-alt';
                }
            }
        }
    }

    showError(message) {
        const tempElement = document.getElementById('weather-temp');
        const descElement = document.getElementById('weather-desc');
        
        if (tempElement) tempElement.textContent = '--°C';
        if (descElement) descElement.textContent = `Error: ${message}`;
        
        console.error('Weather error:', message);
    }
}

// Initialize weather module when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.weatherModule = new WeatherModule();
});