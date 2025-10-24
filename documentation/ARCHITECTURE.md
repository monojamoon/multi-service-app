# Architecture Diagram

## System Architecture

```
╔═══════════════════════════════════════════════════════════════╗
║                         USER BROWSER                          ║
║                    http://localhost:3000                      ║
╚═══════════════════════════════════════════════════════════════╝
                              │
                              │ HTTP Requests
                              ▼
╔═══════════════════════════════════════════════════════════════╗
║                    DOCKER COMPOSE LAYER                       ║
║  ┌─────────────────────────────────────────────────────────┐ ║
║  │              DOCKER NETWORK (app-network)               │ ║
║  │                                                         │ ║
║  │  ┌──────────────────────┐    ┌──────────────────────┐ │ ║
║  │  │  FRONTEND CONTAINER  │    │  BACKEND CONTAINER   │ │ ║
║  │  │  ──────────────────  │    │  ─────────────────   │ │ ║
║  │  │  React Application   │───▶│  Flask API Server    │ │ ║
║  │  │                      │    │                      │ │ ║
║  │  │  Port: 3000          │    │  Port: 5000          │ │ ║
║  │  │  Image: node:18      │    │  Image: python:3.11  │ │ ║
║  │  │                      │    │                      │ │ ║
║  │  │  Components:         │    │  Endpoints:          │ │ ║
║  │  │  • Calculator        │    │  • /api/calculator   │ │ ║
║  │  │  • Abbreviation      │    │  • /api/abbreviation │ │ ║
║  │  │  • Credentials       │    │  • /api/credentials  │ │ ║
║  │  │                      │    │  • /health           │ │ ║
║  │  └──────────────────────┘    └──────────────────────┘ │ ║
║  │                                                         │ ║
║  └─────────────────────────────────────────────────────────┘ ║
╚═══════════════════════════════════════════════════════════════╝
                              │
                              │ Reads configuration
                              ▼
╔═══════════════════════════════════════════════════════════════╗
║                        .env FILE                              ║
║  ─────────────────────────────────────────────────────────   ║
║  BACKEND_PORT=5000                                            ║
║  FRONTEND_PORT=3000                                           ║
║  REACT_APP_API_BASE_URL=http://localhost:5000                 ║
║  COMPOSE_PROJECT_NAME=multi-service-app                       ║
╚═══════════════════════════════════════════════════════════════╝
```

## Service Flow

```
┌──────────────────────────────────────────────────────────────┐
│                    REQUEST FLOW                              │
└──────────────────────────────────────────────────────────────┘

User Action (Calculator)
    │
    ├─▶ Calculator Component (React)
    │       │
    │       ├─▶ Axios HTTP Client
    │       │       │
    │       │       └─▶ POST http://localhost:5000/api/calculator/add
    │       │                   │
    │       │                   └─▶ Flask Backend
    │       │                           │
    │       │                           ├─▶ Validate Input
    │       │                           ├─▶ Perform Operation
    │       │                           └─▶ Return JSON Response
    │       │                   ┌───────┘
    │       │       ┌───────────┘
    │       └───────┘
    │   Display Result
    └─▶ User sees result

User Action (Abbreviation Expander)
    │
    ├─▶ AbbreviationExpander Component (React)
    │       │
    │       ├─▶ Axios HTTP Client
    │       │       │
    │       │       └─▶ POST http://localhost:5000/api/abbreviation/time_zones
    │       │                   │
    │       │                   └─▶ Flask Backend
    │       │                           │
    │       │                           ├─▶ Check Dictionary
    │       │                           ├─▶ Find Expansion
    │       │                           └─▶ Return JSON Response
    │       │                   ┌───────┘
    │       │       ┌───────────┘
    │       └───────┘
    │   Display Expansion
    └─▶ User sees full form

User Action (Credentials Generator)
    │
    ├─▶ CredentialsGenerator Component (React)
    │       │
    │       ├─▶ Axios HTTP Client
    │       │       │
    │       │       └─▶ POST http://localhost:5000/api/credentials_generator/generate_password
    │       │                   │
    │       │                   └─▶ Flask Backend
    │       │                           │
    │       │                           ├─▶ Build Character Set
    │       │                           ├─▶ Generate Random String
    │       │                           └─▶ Return JSON Response
    │       │                   ┌───────┘
    │       │       ┌───────────┘
    │       └───────┘
    │   Display Generated Credential
    └─▶ User copies to clipboard
```

## Component Structure

```
Frontend (React)
├── App.js (Main Container)
│   ├── Navigation Tabs
│   ├── Service Router
│   └── Components
│       ├── Calculator.js
│       │   ├── Input Fields (num1, num2)
│       │   ├── Operation Buttons (Add, Subtract)
│       │   └── Result Display
│       │
│       ├── AbbreviationExpander.js
│       │   ├── Timezone Section
│       │   │   ├── Input Field
│       │   │   └── Expand Button
│       │   └── New Age Section
│       │       ├── Input Field
│       │       └── Expand Button
│       │
│       └── CredentialsGenerator.js
│           ├── Username Section
│           │   ├── Length Slider
│           │   ├── Prefix Input
│           │   ├── Options (Numbers, Special)
│           │   └── Generate Button
│           └── Password Section
│               ├── Length Slider
│               ├── Options (Upper, Lower, Numbers, Special)
│               └── Generate Button

Backend (Flask)
├── app.py
│   ├── CORS Configuration
│   ├── Dictionaries
│   │   ├── TIMEZONE_ABBREVIATIONS
│   │   └── NEW_AGE_ABBREVIATIONS
│   ├── Calculator Routes
│   │   ├── /api/calculator/add
│   │   └── /api/calculator/subtract
│   ├── Abbreviation Routes
│   │   ├── /api/abbreviation/time_zones
│   │   └── /api/abbreviation/new_age_expansions
│   ├── Credentials Routes
│   │   ├── /api/credentials_generator/generate_username
│   │   └── /api/credentials_generator/generate_password
│   └── Health Route
│       └── /health
```

## Data Flow Example

```
Calculator Addition Example:
══════════════════════════

Frontend Input:
  num1 = 10
  num2 = 5

  ┌─────────────────────┐
  │  User clicks "Add"  │
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────────────┐
  │  axios.post(..., {          │
  │    "num1": 10,              │
  │    "num2": 5                │
  │  })                         │
  └──────────┬──────────────────┘
             │
             ▼
  ┌─────────────────────────────┐
  │  Flask: @app.route('/add')  │
  │  result = 10 + 5 = 15       │
  └──────────┬──────────────────┘
             │
             ▼
  ┌─────────────────────────────┐
  │  JSON Response:             │
  │  {                          │
  │    "success": true,         │
  │    "result": 15,            │
  │    "operation": "addition"  │
  │  }                          │
  └──────────┬──────────────────┘
             │
             ▼
  ┌─────────────────────────────┐
  │  Display: "Result: 15"      │
  └─────────────────────────────┘
```

## Deployment Flow

```
Developer Machine
    │
    ├─▶ docker-compose up --build
    │       │
    │       ├─▶ Read .env file
    │       │       │
    │       │       └─▶ Set environment variables
    │       │
    │       ├─▶ Build Backend Container
    │       │       │
    │       │       ├─▶ FROM python:3.11-slim
    │       │       ├─▶ COPY requirements.txt
    │       │       ├─▶ RUN pip install
    │       │       ├─▶ COPY app.py
    │       │       └─▶ CMD ["python", "app.py"]
    │       │
    │       ├─▶ Build Frontend Container
    │       │       │
    │       │       ├─▶ FROM node:18-alpine
    │       │       ├─▶ COPY package.json
    │       │       ├─▶ RUN npm install
    │       │       ├─▶ COPY src/
    │       │       └─▶ CMD ["npm", "start"]
    │       │
    │       ├─▶ Create Network (app-network)
    │       │
    │       └─▶ Start Containers
    │               │
    │               ├─▶ Backend: Port 5000
    │               └─▶ Frontend: Port 3000
    │
    └─▶ Application Running
            │
            └─▶ Access: http://localhost:3000
```

---

This architecture provides:
✅ Service isolation
✅ Easy scaling
✅ Environment-based configuration
✅ Network security
✅ Health monitoring
✅ Auto-restart capabilities
