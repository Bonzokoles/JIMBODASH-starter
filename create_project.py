#!/usr/bin/env python3
"""
JIMBODASH Project Structure Creator

This script creates the complete directory structure for JIMBODASH
if it doesn't exist. Useful for fresh installations.
"""

import os
import sys
from pathlib import Path

def create_project_structure(base_path=None):
    """
    Create the JIMBODASH project structure
    
    Args:
        base_path (str): Base directory path. If None, uses current directory.
    """
    
    if base_path is None:
        base_path = os.getcwd()
    
    print(f"Creating JIMBODASH project structure in: {base_path}")
    
    # Define the directory structure
    directories = [
        'backend',
        'backend/utils',
        'frontend',
        'frontend/static',
        'frontend/static/css',
        'frontend/static/js',
        'frontend/static/img',
        'frontend/templates',
        'config',
        'docs',
        'tests',
        'tests/backend',
        'tests/frontend'
    ]
    
    # Create directories
    for directory in directories:
        dir_path = os.path.join(base_path, directory)
        try:
            os.makedirs(dir_path, exist_ok=True)
            print(f"✓ Created directory: {directory}")
        except OSError as e:
            print(f"✗ Error creating directory {directory}: {e}")
            return False
    
    # Create essential files if they don't exist
    essential_files = {
        '.env': create_env_content(),
        '.gitignore': create_gitignore_content(),
        'backend/__init__.py': '',
        'backend/utils/__init__.py': '',
        'frontend/static/img/.gitkeep': '',
        'docs/README.md': create_docs_readme(),
        'tests/__init__.py': '',
        'tests/backend/__init__.py': '',
        'tests/frontend/__init__.py': ''
    }
    
    for file_path, content in essential_files.items():
        full_path = os.path.join(base_path, file_path)
        if not os.path.exists(full_path):
            try:
                with open(full_path, 'w', encoding='utf-8') as f:
                    f.write(content)
                print(f"✓ Created file: {file_path}")
            except OSError as e:
                print(f"✗ Error creating file {file_path}: {e}")
    
    print("\n🎉 JIMBODASH project structure created successfully!")
    print("\nNext steps:")
    print("1. Copy .env.example to .env and configure your settings")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Run the application: python run.py")
    
    return True

def create_env_content():
    """Create default .env file content"""
    return """# JIMBODASH Environment Configuration
# Copy from .env.example and customize

# Weather API
WEATHER_API_KEY=your_api_key_here
WEATHER_CITY=Warsaw

# Ollama AI
OLLAMA_MODEL=llama2
OLLAMA_HOST=http://localhost:11434

# Flask Settings
FLASK_ENV=development
SECRET_KEY=change_this_in_production
DEBUG=True

# Application
APP_HOST=127.0.0.1
APP_PORT=5000
AUTO_OPEN_BROWSER=True
"""

def create_gitignore_content():
    """Create .gitignore file content"""
    return """# JIMBODASH .gitignore

# Environment variables
.env
.env.local
.env.*.local

# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# Virtual environments
venv/
env/
ENV/
.venv/

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
*.log
logs/

# Database
*.db
*.sqlite3

# OS
.DS_Store
Thumbs.db

# Temporary files
*.tmp
*.temp

# Coverage reports
htmlcov/
.coverage
.coverage.*
coverage.xml

# Test artifacts
.pytest_cache/
.tox/

# Documentation
docs/_build/
"""

def create_docs_readme():
    """Create documentation README"""
    return """# JIMBODASH Documentation

This directory contains project documentation.

## Contents

- `api.md` - API documentation
- `installation.md` - Installation guide
- `configuration.md` - Configuration options
- `development.md` - Development guide
- `deployment.md` - Deployment instructions

## Contributing

When adding new features, please update the relevant documentation.
"""

if __name__ == '__main__':
    # Get base path from command line argument or use current directory
    base_path = sys.argv[1] if len(sys.argv) > 1 else None
    
    try:
        success = create_project_structure(base_path)
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\nOperation cancelled by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\nUnexpected error: {e}")
        sys.exit(1)