# 🔗 ConnectHub

A modern full-stack application for managing users, groups, and events. Built with Spring Boot, React, PostgreSQL, and deployed using Docker, Docker Compose, and Kubernetes.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Docker Compose Deployment](#docker-compose-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Database Design](#database-design)

---

## 🎯 Overview

ConnectHub is a multi-service application designed to demonstrate modern DevOps practices including containerization, orchestration, CI/CD automation, and Kubernetes deployment. The application provides a simple interface to:

- Create and manage users
- Create and manage groups
- Create and manage events associated with groups
- Persist data in a PostgreSQL database

## 🏗️ Architecture

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│             │      │             │      │             │
│  Frontend   │─────▶│   Backend   │─────▶│  PostgreSQL │
│  (React)    │      │ (Spring Boot│      │  Database   │
│  Port: 80   │      │  Port: 8080)│      │  Port: 5432 │
│             │      │             │      │             │
└─────────────┘      └─────────────┘      └─────────────┘
```

### Components

- **Frontend**: React + Vite application served by Nginx
- **Backend**: Spring Boot REST API with JPA/Hibernate
- **Database**: PostgreSQL 15 with persistent storage
- **Networking**: Docker bridge network / Kubernetes internal networking

---

## 🛠️ Technologies

### Backend
- Java 17
- Spring Boot 3.x
- Spring Data JPA
- PostgreSQL Driver
- Gradle

### Frontend
- React 18
- Vite
- Modern CSS
- Nginx (production)

### DevOps
- Docker & Docker Compose
- Kubernetes (StatefulSet, Deployments, Services)
- GitHub Actions CI/CD
- Docker Hub Registry

---

## ✅ Prerequisites

- Docker Desktop (with Kubernetes enabled) or Minikube
- Git
- Docker Hub account (for CI/CD)
- kubectl CLI (for Kubernetes deployment)

---

## 🚀 Quick Start

### Clone the Repository

```bash
git clone https://github.com/yourusername/connecthub.git
cd connecthub
```

---

## 🐳 Docker Compose Deployment

### Launch the Stack

```bash
docker-compose up --build
```

This single command will:
1. Build the backend and frontend images
2. Start the PostgreSQL database with health checks
3. Wait for the database to be ready
4. Start the backend service
5. Wait for the backend to be healthy
6. Start the frontend service

### Access the Application

- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:8080
- **Health Check**: http://localhost:8080/health

### Stop the Stack

```bash
docker-compose down
```

### Remove Volumes (Reset Database)

```bash
docker-compose down -v
```

---

## ☸️ Kubernetes Deployment

### Prerequisites

Enable Kubernetes in Docker Desktop:

1. Open Docker Desktop
2. Go to Settings → Kubernetes
3. Check "Enable Kubernetes"
4. Click "Apply & Restart"
5. Wait for Kubernetes to start (green indicator)

### Deploy to Kubernetes

#### 1. Apply PostgreSQL Resources

```bash
kubectl apply -f k8s/postgres-secret.yml
kubectl apply -f k8s/postgres-statefulset.yml
kubectl apply -f k8s/postgres-service.yml
kubectl apply -f k8s/postgres-headless-service.yml
```

#### 2. Apply Backend Resources

```bash
kubectl apply -f k8s/backend-config.yml
kubectl apply -f k8s/backend-deployment.yml
kubectl apply -f k8s/backend-service.yml
```

#### 3. Apply Frontend Resources

```bash
kubectl apply -f k8s/frontend-deployment.yml
kubectl apply -f k8s/frontend-service.yml
```

### Access the Application

```bash
# Get NodePort services
kubectl get services

# Access frontend
http://localhost:30090

# Access backend API
http://localhost:30080
```

### Verify Deployment

```bash
# Check all pods
kubectl get pods

# Check services
kubectl get services

# Check persistent volumes
kubectl get pvc

# View backend logs
kubectl logs -l app=connecthub-backend

# View frontend logs
kubectl logs -l app=connecthub-frontend
```

### Scale Replicas

```bash
# Scale backend
kubectl scale deployment connecthub-backend --replicas=3

# Scale frontend
kubectl scale deployment connecthub-frontend --replicas=3
```

### Clean Up

```bash
kubectl delete -f k8s/
```

---

## 🔄 CI/CD Pipeline

The project uses **GitHub Actions** for continuous integration and deployment.

### Pipeline Stages

#### 1. **Test Stage**
- Checks out code
- Sets up JDK 17 for backend
- Caches Gradle dependencies
- Builds backend (tests skipped for demo)
- Sets up Node.js 20 for frontend
- Installs frontend dependencies
- Validates frontend build

#### 2. **Build Stage**
- Builds Docker images for backend and frontend
- Uses BuildKit for caching
- Tags images with commit SHA

#### 3. **Push Stage** (main branch only)
- Authenticates with Docker Hub
- Builds multi-platform images (amd64, arm64)
- Pushes images with `latest` and commit SHA tags

### Triggers

- **Push**: Runs on `main` and `develop` branches
- **Pull Request**: Runs on PRs targeting `main`

### Required Secrets

Add these secrets in GitHub repository settings:

- `DOCKERHUB_USERNAME`: Your Docker Hub username
- `DOCKERHUB_TOKEN`: Your Docker Hub access token

### View Pipeline

Check the Actions tab in your GitHub repository to see pipeline executions.

---

## 📡 API Documentation

### Base URL

```
http://localhost:8080
```

### Endpoints

#### Health Check

```http
GET /health
```

#### Users

```http
GET /users              # Get all users
POST /users             # Create user
Body: { "name": "John", "email": "john@example.com" }
```

#### Groups

```http
GET /groups             # Get all groups
POST /groups            # Create group
Body: { "name": "Developers", "description": "Dev team" }
```

#### Events

```http
GET /events             # Get all events
POST /events/group/{groupId}   # Create event for group
Body: { "title": "Meeting", "date": "2025-12-25T10:00:00" }
```

---

## 📁 Project Structure

```
connecthub/
├── backend/
│   ├── src/main/java/com/example/backend/
│   │   ├── controller/      # REST controllers
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data repositories
│   │   └── service/         # Business logic
│   ├── Dockerfile
│   └── build.gradle
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Styles
│   │   └── api.js           # API client
│   ├── Dockerfile
│   ├── nginx.conf
│   └── package.json
├── k8s/
│   ├── backend-*.yml        # Backend K8s resources
│   ├── frontend-*.yml       # Frontend K8s resources
│   └── postgres-*.yml       # Database K8s resources
├── .github/workflows/
│   └── ci-cd.yml           # GitHub Actions pipeline
├── docker-compose.yml
└── README.md
```

---

## 🗄️ Database Design

### Database Choice: PostgreSQL

**Justification**: PostgreSQL was chosen for its:
- ACID compliance for data integrity
- Robust support for relational data
- JSON support for future flexibility
- Excellent performance and scalability
- Strong Spring Boot integration

### Schema

#### Users Table
```sql
users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE
)
```

#### Groups Table
```sql
groups (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  description VARCHAR(255)
)
```

#### Events Table
```sql
events (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255),
  date TIMESTAMP,
  group_id BIGINT REFERENCES groups(id)
)
```

### Kubernetes Database Deployment

**Option A** (Implemented): Database inside Kubernetes
- Uses StatefulSet for stable pod identity
- PersistentVolumeClaim for data persistence
- Headless service for stable network identity
- Readiness/liveness probes for health monitoring

**Benefits**:
- Simplified architecture (everything in K8s)
- Automatic pod recovery
- Volume persistence across restarts
- Consistent deployment model

---

## 🎓 Technical Defense Notes

### Architectural Decisions

1. **Multi-stage Docker Builds**: Reduces final image size by separating build and runtime dependencies
2. **Health Checks**: Ensures services are ready before accepting traffic
3. **StatefulSet for Database**: Provides stable identity and persistent storage for stateful workloads
4. **ConfigMaps and Secrets**: Separates configuration from code, enables secure credential management
5. **Probes**: Readiness probes prevent traffic to unhealthy pods, liveness probes restart failed containers

### CI/CD Strategy

1. **Three-stage pipeline**: Test → Build → Push ensures quality gates
2. **Conditional execution**: Push only on main branch prevents unnecessary registry uploads
3. **Multi-platform builds**: Supports both x86 and ARM architectures
4. **Cache optimization**: BuildKit caching speeds up subsequent builds

### Kubernetes Design

1. **Separation of concerns**: ConfigMaps for non-sensitive config, Secrets for credentials
2. **Resource limits**: Prevents resource exhaustion and enables better scheduling
3. **Rolling updates**: Zero-downtime deployments through Kubernetes deployment strategy
4. **Service discovery**: Internal DNS enables service-to-service communication

---

## 👥 Team

- **Instructor**: Nadim Henoud, Toufic Fakhry
- **Course**: 020IDCE5 - Intégration et Déploiement Continue
- **Semester**: Fall 2025-26

---

## 📝 License

This project is created for educational purposes as part of the DevOps, CI/CD & Containerization course.

---

## 🤝 Contributing

This is an academic project. For questions or suggestions, please contact the team members or instructors.