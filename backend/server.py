from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from chatbot import AIChat
from weather_integration import WeatherAPI
from dotenv import load_dotenv
import psutil

# Load environment variables
load_dotenv()

app = Flask(__name__,
    template_folder='../frontend/templates',
    static_folder='../frontend/static'
)
CORS(app)

# Initialize AI Chat and Weather API
ai_chat_instance = AIChat()
weather_api_instance = WeatherAPI(os.getenv('WEATHER_API_KEY'))


@app.route('/')
def index():
    return render_template('dashboard.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message', '')
    response = ai_chat_instance.get_response(user_message)
    return jsonify({'response': response})

@app.route('/api/weather', methods=['GET'])
def weather():
    city = request.args.get('city', 'Warsaw')
    weather_data = weather_api_instance.get_weather(city)
    return jsonify(weather_data)

@app.route('/api/system-stats', methods=['GET'])
def system_stats():
    try:
        cpu_percent = psutil.cpu_percent(interval=0.5)
        ram_percent = psutil.virtual_memory().percent
        disk_percent = psutil.disk_usage('/').percent  # Unix/Linux style
        
        return jsonify({
            'cpu': cpu_percent,
            'ram': ram_percent,
            'disk': disk_percent
        })
    except Exception as e:
        print(f"Error fetching system stats: {e}")
        return jsonify({'error': 'Could not fetch system stats'}), 500

@app.route('/api/status', methods=['GET'])
def status():
    return jsonify({'status': 'JIMBODASH is running!', 'version': '1.0.0'})


if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True, port=5000, host='127.0.0.1')