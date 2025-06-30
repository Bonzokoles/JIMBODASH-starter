import requests
import os

class WeatherAPI:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "http://api.openweathermap.org/data/2.5/weather"

    def get_weather(self, city):
        if not self.api_key:
            return {'error': 'Weather API key not configured. Please add WEATHER_API_KEY to your .env file.'}
        try:
            params = {
                'q': city,
                'appid': self.api_key,
                'units': 'metric',
                'lang': 'en'
            }
            response = requests.get(self.base_url, params=params)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Weather API request failed: {e}")
            return {'error': f"Error fetching weather data: {str(e)}"}