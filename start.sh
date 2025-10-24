#!/bin/bash

echo "================================================"
echo "  Multi-Service Application Startup Script"
echo "================================================"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"
echo ""

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating default .env file..."
    cat > .env << EOF
# Backend Configuration
BACKEND_PORT=5000

# Frontend Configuration
FRONTEND_PORT=3000
REACT_APP_API_BASE_URL=http://localhost:5000

# Docker Configuration
COMPOSE_PROJECT_NAME=multi-service-app
EOF
    echo "✅ Created .env file with default values"
    echo ""
fi

echo "🔨 Building and starting the application..."
echo ""

# Build and start services
docker-compose up --build -d

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "  ✅ Application started successfully!"
    echo "================================================"
    echo ""
    echo "📱 Frontend: http://localhost:3000"
    echo "🔧 Backend API: http://localhost:5000"
    echo "💚 Health Check: http://localhost:5000/health"
    echo ""
    echo "To view logs: docker-compose logs -f"
    echo "To stop: docker-compose down"
    echo ""
    echo "================================================"
else
    echo ""
    echo "❌ Failed to start the application"
    echo "Check the error messages above for details"
    exit 1
fi
