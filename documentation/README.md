# Multi-Service Web Application

A full-stack web application offering three distinct services: Calculator, Abbreviation Expander, and Credentials Generator.

## 🌟 Features

### 1. Calculator Service
- **Addition**: Add two numbers
- **Subtraction**: Subtract two numbers
- Real-time calculation with error handling

### 2. Abbreviation Expander
- **Timezone Abbreviations**: Expand timezone codes (MST, EST, PST, CST, GMT)
- **New Age Abbreviations**: Expand internet slang (LOL, BRB, OMG, IMHO, FOMO)
- Helpful error messages showing available abbreviations

### 3. Credentials Generator
- **Username Generator**: 
  - Customizable length
  - Optional prefix
  - Toggle numbers and special characters
- **Password Generator**:
  - Customizable length (4-100 characters)
  - Toggle uppercase, lowercase, numbers, and special characters
  - Copy to clipboard functionality

## 🛠️ Tech Stack

- **Frontend**: React 18, Axios
- **Backend**: Python 3.11, Flask, Flask-CORS
- **Containerization**: Docker
- **Orchestration**: Docker Compose
- **Configuration**: Environment variables via .env file

## 📋 Prerequisites

- Docker (version 20.10 or higher)
- Docker Compose (version 2.0 or higher)
- Git

## 🚀 Quick Start

### 1. Clone or Setup the Project

Ensure you have all the files in the following structure:
```
.
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Calculator.js
│   │   │   ├── AbbreviationExpander.js
│   │   │   └── CredentialsGenerator.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── public/
│   │   └── index.html
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
├── .env
├── .gitignore
└── README.md
```

### 2. Configure Environment Variables

The `.env` file contains all configuration:

```env
# Backend Configuration
BACKEND_PORT=5000

# Frontend Configuration
FRONTEND_PORT=3000
REACT_APP_API_BASE_URL=http://localhost:5000

# Docker Configuration
COMPOSE_PROJECT_NAME=multi-service-app
```

**Note**: If you need to change ports or API URL, modify these values before starting the application.

### 3. Build and Run with Docker Compose

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up --build -d
```

### 4. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

### 5. Stop the Application

```bash
# Stop and remove containers
docker-compose down

# Stop, remove containers and volumes
docker-compose down -v
```

## 📡 API Endpoints

### Calculator Service

**POST** `/api/calculator/add`
```json
Request:
{
  "num1": 10,
  "num2": 5
}

Response:
{
  "success": true,
  "result": 15,
  "operation": "addition"
}
```

**POST** `/api/calculator/subtract`
```json
Request:
{
  "num1": 10,
  "num2": 5
}

Response:
{
  "success": true,
  "result": 5,
  "operation": "subtraction"
}
```

### Abbreviation Expander Service

**POST** `/api/abbreviation/time_zones`
```json
Request:
{
  "abbreviation": "MST"
}

Response:
{
  "success": true,
  "abbreviation": "MST",
  "expansion": "Mountain Standard Time"
}
```

**POST** `/api/abbreviation/new_age_expansions`
```json
Request:
{
  "abbreviation": "LOL"
}

Response:
{
  "success": true,
  "abbreviation": "LOL",
  "expansion": "Laugh Out Loud"
}
```

### Credentials Generator Service

**POST** `/api/credentials_generator/generate_username`
```json
Request:
{
  "length": 10,
  "prefix": "user_",
  "include_numbers": true,
  "include_special": false
}

Response:
{
  "success": true,
  "username": "user_abc123",
  "length": 10
}
```

**POST** `/api/credentials_generator/generate_password`
```json
Request:
{
  "length": 16,
  "include_uppercase": true,
  "include_lowercase": true,
  "include_numbers": true,
  "include_special": true
}

Response:
{
  "success": true,
  "password": "aB3$xY9#mN2@pQ5!",
  "length": 16
}
```

## 🔧 Development

### Running Backend Locally (without Docker)

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Running Frontend Locally (without Docker)

```bash
cd frontend
npm install
npm start
```

**Note**: When running locally without Docker, update `REACT_APP_API_BASE_URL` in the frontend to point to your local backend.

## 🐛 Troubleshooting

### Port Already in Use
If ports 3000 or 5000 are already in use, modify the `.env` file:
```env
BACKEND_PORT=5001
FRONTEND_PORT=3001
REACT_APP_API_BASE_URL=http://localhost:5001
```

### CORS Issues
The backend includes Flask-CORS for cross-origin requests. If you encounter CORS errors, ensure:
1. Backend is running
2. Frontend is using the correct API URL
3. No proxy/firewall is blocking requests

### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild from scratch
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Frontend Can't Connect to Backend
1. Verify backend is healthy: http://localhost:5000/health
2. Check `REACT_APP_API_BASE_URL` in `.env`
3. Ensure both containers are on the same network

## 📝 Extending the Application

### Adding More Abbreviations

Edit `backend/app.py` and add entries to the dictionaries:

```python
TIMEZONE_ABBREVIATIONS = {
    'MST': 'Mountain Standard Time',
    'NEW_ABBR': 'Your New Timezone',
    # Add more here
}

NEW_AGE_ABBREVIATIONS = {
    'LOL': 'Laugh Out Loud',
    'NEW_ABBR': 'Your New Phrase',
    # Add more here
}
```

### Adding New API Endpoints

1. Add the endpoint in `backend/app.py`
2. Create a new component in `frontend/src/components/`
3. Import and use the component in `App.js`

## 📦 Project Structure Explained

```
├── backend/                 # Python Flask backend
│   ├── app.py              # Main Flask application with all API endpoints
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container configuration
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components for each service
│   │   ├── App.js         # Main application component
│   │   └── App.css        # Styling
│   ├── public/            # Static files
│   ├── package.json       # Node dependencies
│   └── Dockerfile         # Frontend container configuration
│
├── docker-compose.yml     # Multi-container orchestration
└── .env                   # Environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🎯 Future Enhancements

- [ ] Add more calculator operations (multiplication, division, etc.)
- [ ] Database integration for storing abbreviation history
- [ ] User authentication for credentials generator
- [ ] Export/save generated credentials
- [ ] More abbreviation categories
- [ ] Unit and integration tests
- [ ] CI/CD pipeline
- [ ] API rate limiting
- [ ] Input validation improvements

## 💡 Tips

- Use the health check endpoint to monitor backend status
- All passwords are generated randomly and not stored
- Copy button works on all modern browsers
- Mobile-responsive design works on all screen sizes

---

**Happy Coding! 🚀**
