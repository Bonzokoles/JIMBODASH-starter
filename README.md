# JIMBODASH-starter 🚀

**Professional Flask Dashboard Starter Template**

A complete full-stack web application starter template featuring AI chatbot integration, weather API, 3D visualizations, and system monitoring capabilities.

## 🎯 Features

- **🌐 Flask Backend** - RESTful API with modular architecture
- **🎨 Modern Frontend** - Bootstrap 5.3.0 responsive UI
- **🤖 AI Chatbot** - Ollama LLM integration for intelligent conversations
- **🌤️ Weather Integration** - Real-time weather data display
- **📊 3D Visualizations** - Three.js powered graphics
- **💻 System Monitoring** - Live server performance metrics
- **⚡ Hot Reload** - Development mode with auto-refresh
- **🔧 Easy Configuration** - Environment-based settings

## 🛠️ Tech Stack

### Backend
- **Flask 2.2.3** - Web framework
- **Flask-CORS** - Cross-origin resource sharing
- **Ollama** - Local LLM integration
- **psutil** - System and process utilities
- **pandas & numpy** - Data processing
- **python-dotenv** - Environment management

### Frontend
- **Bootstrap 5.3.0** - CSS framework
- **Font Awesome 6.4.0** - Icon library
- **Three.js 0.152.0** - 3D graphics library
- **Custom CSS/JS** - Dashboard styling and interactions

## 📂 Project Structure

```
JIMBODASH-starter/
├── backend/
│   ├── server.py              # Main Flask application
│   ├── chatbot.py             # AI chatbot functionality
│   ├── weather_integration.py # Weather API integration
│   ├── requirements.txt       # Backend dependencies
│   └── utils/                 # Utility modules
├── frontend/
│   ├── static/
│   │   ├── css/              # Stylesheets
│   │   ├── js/               # JavaScript modules
│   │   └── img/              # Images and assets
│   └── templates/
│       └── dashboard.html     # Main dashboard template
├── config/                    # Configuration files
├── .env                      # Environment variables
├── requirements.txt          # Main dependencies
└── run.py                   # Application launcher
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- pip (Python package manager)
- Ollama installed (for AI chatbot functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bonzokoles/JIMBODASH-starter.git
   cd JIMBODASH-starter
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env file with your API keys and settings
   ```

4. **Run the application**
   ```bash
   python run.py
   ```

The application will automatically open in your browser at `http://127.0.0.1:5000`

## ⚙️ Configuration

### Environment Variables (.env)
```env
# Weather API
WEATHER_API_KEY=your_weather_api_key_here

# Ollama Settings
OLLAMA_MODEL=llama2
OLLAMA_HOST=http://localhost:11434

# Flask Settings
FLASK_ENV=development
SECRET_KEY=your_secret_key_here
```

### Available Models
The template supports various Ollama models:
- `llama2` (default)
- `codellama`
- `mistral`
- `phi`

## 🎨 Customization

### Adding New Features
1. **Backend**: Add new routes in `backend/server.py`
2. **Frontend**: Create new templates in `frontend/templates/`
3. **Styling**: Modify CSS in `frontend/static/css/`
4. **JavaScript**: Add functionality in `frontend/static/js/`

### UI Customization
- **Colors**: Modify CSS variables in `style.css`
- **Layout**: Edit `dashboard.html` template
- **Icons**: Use Font Awesome classes
- **3D Graphics**: Extend `3d_visualizations.js`

## 📊 Dashboard Components

### Available Widgets
- **📈 System Metrics** - CPU, Memory, Disk usage
- **🤖 AI Chat** - Interactive chatbot interface
- **🌤️ Weather Display** - Current conditions and forecast
- **📊 Data Visualization** - Charts and 3D graphics
- **⚙️ Settings Panel** - Configuration management

### Adding Custom Widgets
1. Create widget HTML in `dashboard.html`
2. Add styling in `dashboard.css`
3. Implement functionality in respective JS files
4. Add backend endpoints if needed

## 🔌 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Main dashboard |
| `/api/chat` | POST | AI chatbot interaction |
| `/api/weather` | GET | Weather data |
| `/api/system` | GET | System metrics |
| `/api/status` | GET | Application status |

## 🛡️ Security Features

- **CORS Protection** - Configured cross-origin policies
- **Environment Variables** - Sensitive data protection
- **Input Validation** - API request sanitization
- **Error Handling** - Graceful error management

## 🧪 Development

### Running in Development Mode
```bash
python run.py
```
Features debug mode with:
- Auto-reload on file changes
- Detailed error messages
- Development-specific configurations

### Testing
```bash
# Run basic functionality tests
python -m pytest tests/

# Check code style
flake8 backend/
```

## 📦 Deployment

### Local Production
```bash
# Set production environment
export FLASK_ENV=production

# Run with Gunicorn
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 backend.server:app
```

### Docker Deployment
```bash
# Build Docker image
docker build -t jimbodash-starter .

# Run container
docker run -p 5000:5000 jimbodash-starter
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check the `/docs` folder for detailed guides
- **Issues**: Report bugs or request features via GitHub Issues
- **Community**: Join our discussions in GitHub Discussions

## 🎯 Use Cases

Perfect for building:
- **Business Dashboards** - Analytics and monitoring panels
- **Admin Interfaces** - Content management systems
- **IoT Dashboards** - Device monitoring and control
- **Data Visualization** - Interactive charts and reports
- **AI Applications** - Chatbot and ML model interfaces

## 🚀 Next Steps

After setup, you can:
1. Customize the dashboard layout
2. Add your own API integrations
3. Implement additional AI models
4. Create custom visualizations
5. Deploy to your preferred platform

---

**Built with ❤️ by Bonzokoles | Powered by JIMBO AI**

*Ready to build amazing applications? Let's get started! 🚀*