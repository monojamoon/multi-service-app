# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Navigate to Project Directory
```bash
cd /path/to/multi-service-app
```

### Step 2: Start the Application
```bash
# Option A: Use the startup script (recommended)
./start.sh

# Option B: Use docker-compose directly
docker-compose up --build -d
```

### Step 3: Open Your Browser
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/health

## 🎯 Quick Commands

```bash
# View logs
docker-compose logs -f

# Stop application
docker-compose down

# Restart application
docker-compose restart

# Check running containers
docker-compose ps

# Rebuild containers
docker-compose up --build
```

## 🧪 Test the APIs with curl

### Calculator
```bash
# Addition
curl -X POST http://localhost:5000/api/calculator/add \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5}'

# Subtraction
curl -X POST http://localhost:5000/api/calculator/subtract \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5}'
```

### Abbreviation Expander
```bash
# Timezone
curl -X POST http://localhost:5000/api/abbreviation/time_zones \
  -H "Content-Type: application/json" \
  -d '{"abbreviation": "MST"}'

# New Age
curl -X POST http://localhost:5000/api/abbreviation/new_age_expansions \
  -H "Content-Type: application/json" \
  -d '{"abbreviation": "LOL"}'
```

### Credentials Generator
```bash
# Username
curl -X POST http://localhost:5000/api/credentials_generator/generate_username \
  -H "Content-Type: application/json" \
  -d '{"length": 10, "prefix": "user_", "include_numbers": true}'

# Password
curl -X POST http://localhost:5000/api/credentials_generator/generate_password \
  -H "Content-Type: application/json" \
  -d '{"length": 16, "include_uppercase": true, "include_lowercase": true}'
```

## 📋 Available Abbreviations

### Timezones
- MST → Mountain Standard Time
- EST → Eastern Standard Time
- PST → Pacific Standard Time
- CST → Central Standard Time
- GMT → Greenwich Mean Time

### New Age
- LOL → Laugh Out Loud
- BRB → Be Right Back
- OMG → Oh My God
- IMHO → In My Humble Opinion
- FOMO → Fear Of Missing Out

## ⚙️ Configuration

Edit `.env` to customize:
```env
BACKEND_PORT=5000        # Change backend port
FRONTEND_PORT=3000       # Change frontend port
REACT_APP_API_BASE_URL=http://localhost:5000  # API endpoint
```

## 🆘 Need Help?

See the full [README.md](README.md) for:
- Detailed API documentation
- Troubleshooting guide
- Development setup
- Architecture details
