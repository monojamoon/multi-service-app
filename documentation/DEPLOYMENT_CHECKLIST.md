# Deployment Checklist ✅

## Pre-Deployment Verification

### System Requirements
- [ ] Docker installed (v20.10+)
- [ ] Docker Compose installed (v2.0+)
- [ ] Ports 3000 and 5000 available
- [ ] At least 2GB RAM available
- [ ] At least 1GB disk space available

### File Integrity Check
Run these commands to verify all files are present:

```bash
# Check backend files
ls -la backend/app.py backend/requirements.txt backend/Dockerfile

# Check frontend files
ls -la frontend/package.json frontend/Dockerfile
ls -la frontend/src/App.js
ls -la frontend/src/components/Calculator.js
ls -la frontend/src/components/AbbreviationExpander.js
ls -la frontend/src/components/CredentialsGenerator.js

# Check configuration files
ls -la docker-compose.yml .env start.sh
```

## Deployment Steps

### Step 1: Initial Setup
```bash
# Navigate to project directory
cd /path/to/multi-service-app

# Verify .env file exists and is configured
cat .env

# Make startup script executable
chmod +x start.sh
```

### Step 2: Build and Start
```bash
# Option A: Using startup script (recommended)
./start.sh

# Option B: Using docker-compose directly
docker-compose up --build -d
```

### Step 3: Verify Deployment
```bash
# Check containers are running
docker-compose ps

# Expected output:
# NAME                    STATUS    PORTS
# multi-service-app_backend    Up    0.0.0.0:5000->5000/tcp
# multi-service-app_frontend   Up    0.0.0.0:3000->3000/tcp

# Check backend health
curl http://localhost:5000/health

# Expected response:
# {"status": "healthy", "service": "backend"}

# View logs (optional)
docker-compose logs -f
```

### Step 4: Test Application
- [ ] Open browser to http://localhost:3000
- [ ] Verify frontend loads without errors
- [ ] Test Calculator service
  - [ ] Addition works
  - [ ] Subtraction works
- [ ] Test Abbreviation Expander
  - [ ] Timezone expansion works (try "MST")
  - [ ] New age expansion works (try "LOL")
- [ ] Test Credentials Generator
  - [ ] Username generation works
  - [ ] Password generation works
  - [ ] Copy to clipboard works

### Step 5: API Testing (Optional)
Test each endpoint with curl:

```bash
# Calculator - Add
curl -X POST http://localhost:5000/api/calculator/add \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5}'

# Calculator - Subtract
curl -X POST http://localhost:5000/api/calculator/subtract \
  -H "Content-Type: application/json" \
  -d '{"num1": 10, "num2": 5}'

# Abbreviation - Timezone
curl -X POST http://localhost:5000/api/abbreviation/time_zones \
  -H "Content-Type: application/json" \
  -d '{"abbreviation": "MST"}'

# Abbreviation - New Age
curl -X POST http://localhost:5000/api/abbreviation/new_age_expansions \
  -H "Content-Type: application/json" \
  -d '{"abbreviation": "LOL"}'

# Credentials - Username
curl -X POST http://localhost:5000/api/credentials_generator/generate_username \
  -H "Content-Type: application/json" \
  -d '{"length": 10, "prefix": "user_"}'

# Credentials - Password
curl -X POST http://localhost:5000/api/credentials_generator/generate_password \
  -H "Content-Type: application/json" \
  -d '{"length": 16, "include_uppercase": true}'
```

## Post-Deployment

### Monitoring
```bash
# View real-time logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check resource usage
docker stats
```

### Maintenance Commands
```bash
# Restart services
docker-compose restart

# Rebuild containers
docker-compose up --build -d

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Complete cleanup (including volumes)
docker-compose down -v
```

## Troubleshooting Checklist

### Frontend Not Loading
- [ ] Check if frontend container is running: `docker-compose ps`
- [ ] Check frontend logs: `docker-compose logs frontend`
- [ ] Verify port 3000 is not in use: `lsof -i :3000` (Mac/Linux)
- [ ] Check REACT_APP_API_BASE_URL in .env

### Backend Not Responding
- [ ] Check if backend container is running: `docker-compose ps`
- [ ] Check backend logs: `docker-compose logs backend`
- [ ] Verify port 5000 is not in use: `lsof -i :5000` (Mac/Linux)
- [ ] Test health endpoint: `curl http://localhost:5000/health`

### API Calls Failing
- [ ] Verify backend is healthy
- [ ] Check browser console for CORS errors
- [ ] Verify network connectivity between containers
- [ ] Check API endpoint URLs

### Port Conflicts
If ports are already in use, modify .env:
```env
BACKEND_PORT=5001
FRONTEND_PORT=3001
REACT_APP_API_BASE_URL=http://localhost:5001
```
Then restart: `docker-compose down && docker-compose up --build -d`

## Security Checklist (Production)

For production deployment, consider:
- [ ] Use environment-specific .env files
- [ ] Enable HTTPS/SSL
- [ ] Add authentication/authorization
- [ ] Implement rate limiting
- [ ] Add input sanitization
- [ ] Use secrets management (Docker secrets, Vault)
- [ ] Scan containers for vulnerabilities
- [ ] Set up monitoring and alerting
- [ ] Configure proper logging
- [ ] Use production-grade WSGI server (Gunicorn)
- [ ] Use production build for React (npm run build)
- [ ] Add nginx reverse proxy

## Documentation Reference

For detailed information, see:
- `README.md` - Complete project documentation
- `QUICKSTART.md` - Quick reference guide
- `ARCHITECTURE.md` - System architecture
- `PROJECT_SUMMARY.md` - Project overview

## Success Criteria

Deployment is successful when:
- [x] All containers are running
- [x] Backend health check returns healthy
- [x] Frontend loads in browser
- [x] All 3 services are functional
- [x] No errors in logs
- [x] API endpoints respond correctly

## Sign-off

Date: _______________
Deployed by: _______________
Verified by: _______________

Notes:
_________________________________
_________________________________
_________________________________

---

**Need Help?** Check the README.md or run: `docker-compose logs -f`
