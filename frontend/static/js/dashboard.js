// JIMBODASH Dashboard JavaScript

class Dashboard {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.startPeriodicUpdates();
    }

    init() {
        console.log('JIMBO Dashboard initializing...');
        this.updateClock();
        this.loadSystemStats();
        this.checkStatus();
    }

    setupEventListeners() {
        // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => this.toggleDarkMode());
        }

        // Sidebar navigation
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });

        // Responsive sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }
    }

    updateClock() {
        const clockElement = document.getElementById('clock-display');
        if (!clockElement) return;

        const updateTime = () => {
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            clockElement.textContent = timeString;
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    async loadSystemStats() {
        try {
            const response = await fetch('/api/system-stats');
            if (!response.ok) throw new Error('Failed to fetch system stats');
            
            const data = await response.json();
            this.updateSystemDisplay(data);
        } catch (error) {
            console.error('Error loading system stats:', error);
            this.showError('Failed to load system statistics');
        }
    }

    updateSystemDisplay(data) {
        // Update CPU usage
        const cpuElement = document.getElementById('cpu-usage');
        if (cpuElement && data.cpu !== undefined) {
            cpuElement.textContent = `${Math.round(data.cpu)}%`;
        }

        // Update RAM usage
        const ramElement = document.getElementById('ram-usage');
        if (ramElement && data.ram !== undefined) {
            ramElement.textContent = `${Math.round(data.ram)}%`;
        }

        // Update Disk usage
        const diskElement = document.getElementById('disk-usage');
        if (diskElement && data.disk !== undefined) {
            diskElement.textContent = `${Math.round(data.disk)}%`;
        }

        // Update progress bars if they exist
        this.updateProgressBar('cpu-progress', data.cpu);
        this.updateProgressBar('ram-progress', data.ram);
        this.updateProgressBar('disk-progress', data.disk);
    }

    updateProgressBar(elementId, percentage) {
        const progressBar = document.getElementById(elementId);
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            progressBar.setAttribute('aria-valuenow', percentage);
            
            // Change color based on usage level
            progressBar.className = 'progress-bar';
            if (percentage > 80) {
                progressBar.classList.add('bg-danger');
            } else if (percentage > 60) {
                progressBar.classList.add('bg-warning');
            } else {
                progressBar.classList.add('bg-success');
            }
        }
    }

    async checkStatus() {
        try {
            const response = await fetch('/api/status');
            if (!response.ok) throw new Error('Server not responding');
            
            const data = await response.json();
            console.log('Server status:', data.status);
        } catch (error) {
            console.error('Status check failed:', error);
        }
    }

    handleNavigation(clickedLink) {
        // Remove active class from all links
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to clicked link
        clickedLink.classList.add('active');
        
        // Handle specific navigation logic here
        const linkId = clickedLink.id;
        console.log(`Navigating to: ${linkId}`);
        
        // You can add specific page switching logic here
        switch(linkId) {
            case 'dashboard-link':
                this.showDashboardView();
                break;
            case 'chat-link':
                this.showChatView();
                break;
            case 'weather-link':
                this.showWeatherView();
                break;
            case 'system-link':
                this.showSystemView();
                break;
            case '3d-link':
                this.show3DView();
                break;
        }
    }

    showDashboardView() {
        console.log('Showing dashboard view');
        // Show all dashboard components
    }

    showChatView() {
        console.log('Showing chat view');
        // Focus on chat component
    }

    showWeatherView() {
        console.log('Showing weather view');
        // Focus on weather component
    }

    showSystemView() {
        console.log('Showing system view');
        // Focus on system monitoring
    }

    show3DView() {
        console.log('Showing 3D view');
        // Focus on 3D visualization
    }

    toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update icon
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('show');
        }
    }

    startPeriodicUpdates() {
        // Update system stats every 5 seconds
        setInterval(() => {
            this.loadSystemStats();
        }, 5000);
    }

    showError(message) {
        console.error(message);
        // You can add toast notifications or other error display here
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
    
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.className = 'fas fa-sun';
        }
    }
});