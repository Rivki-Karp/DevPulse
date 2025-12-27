# 🚀 DevPulse: Full-Stack Enterprise SDLC Management Platform

DevPulse is an enterprise-grade platform for managing the entire Software Development Life Cycle (SDLC). It is designed for organizations, development teams, and product managers who need robust ticketing, real-time collaboration, and role-based dashboards. The main value: bridging business requirements and technical execution, improving efficiency, and providing full control and visibility across all development stages.

> **Quick Links:**
> - [Swagger UI – Interactive API Docs](http://localhost:4000/docs)
> - [Postman Collection](REACT-SERVER/helpdesk.postman_collection.json)
> - [Backend Source](REACT-SERVER/src)
> - [Frontend Source](helpdesk-react/src)

---

## 📑 Table of Contents
- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Security & Authentication](#-security--authentication)
- [Technical Excellence](#-technical-excellence)
- [Performance & Scalability](#-performance--scalability)

---

## 🎯 Overview

DevPulse is a **monorepo full-stack application** with:
- **Frontend (helpdesk-react/):** Modern React SPA with role-based dashboards, real-time ticket management, and contextual collaboration.
- **Backend (REACT-SERVER/):** RESTful API (Node.js, Express, TypeScript) with JWT authentication and layered architecture.

**Target Users:**
- **ClientPM (Product Owner):** Track features and requirements across the lifecycle
- **Developer:** Manage assigned tasks with a focused interface
- **TeamLead:** Prioritize, allocate resources, and maintain team oversight

---

## ✨ Key Features

- **Advanced Authentication & Authorization:** JWT, RBAC, protected routes, and secure session management.
- **Comprehensive Ticket Management:** Full CRUD, status/priority tracking, multi-dimensional filtering, real-time assignment, and bulk operations.
- **Contextual Collaboration:** Threaded comments, audit trails, and rich text support.
- **Role-Specific Dashboards:** Tailored interfaces for ClientPM, Developer, and TeamLead.
- **Modular Enterprise Architecture:** Strict layering (Routes → Controllers → Services → Repositories → DB), full TypeScript, and atomic frontend components.

---

## 🛠️ Tech Stack

### **Frontend**
```
React 18              → Modern UI with Hooks & Functional Components
TypeScript            → Strict type safety, zero any types
React Router v6       → Protected & role-based routing strategy
Context API           → Efficient global state management
Vite                  → Sub-second HMR and optimized builds
CSS3                  → Responsive design with advanced loading states
```

### **Backend**
```
Node.js               → High-performance JavaScript runtime
Express               → Minimalist web framework with middleware composition
TypeScript            → Strict mode with comprehensive type coverage
SQLite3               → ACID-compliant relational database
JWT                   → Industry-standard stateless authentication
Swagger UI            → OpenAPI 3.0 specification with interactive docs
```

### **Development & Quality**
```
ESLint                → Automated code quality enforcement
ts-node-dev           → Hot-reload development with TypeScript support
Postman               → Comprehensive API testing suite
Strict TypeScript     → No any, no implicit any, strict null checks
```

---

## 🏛️ Architecture

### **Backend Layered Structure**
```
REACT-SERVER/
├── src/
│   ├── db/                    # Database initialization & seeding
│   ├── models/                # TypeScript domain models
│   ├── repositories/          # Data access layer with optimized queries
│   ├── services/              # Business logic & domain validation
│   ├── controllers/           # HTTP request handlers
│   ├── routes/                # Express route definitions
│   ├── middleware/            # Auth, RBAC, error handling pipeline
│   ├── swagger/               # OpenAPI documentation
│   └── index.ts               # Application entry point
├── data/                      # SQLite database storage
└── helpdesk.postman_collection.json
```

### **Frontend Component Architecture**
```
helpdesk-react/
├── src/
│   ├── components/
│   │   ├── Comments/          # Threaded comment system
│   │   ├── Dashboards/        # Role-specific view components
│   │   ├── Forms/             # Form components with validation
│   │   ├── styleComponents/   # Atomic design system components
│   │   ├── Tickets/           # Ticket CRUD & display logic
│   │   └── Users/             # User management interface
│   ├── contexts/              # React Context providers (Auth, Theme)
│   ├── guards/                # Route protection & access control
│   ├── models/                # TypeScript interfaces & types
│   ├── service/               # API client & HTTP abstractions
│   └── routes.tsx             # Application routing configuration
└── package.json
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js v16+ (LTS recommended)
- npm or yarn package manager
- Git version control

### **Installation**

```bash
# Clone the repository
git clone <repository-url>
cd devpulse

# Backend setup
cd REACT-SERVER
npm install
npm run build

# Frontend setup
cd ../helpdesk-react
npm install
```

### **Running the Application**

**Terminal 1 - Backend API:**
```bash
cd REACT-SERVER
npm run dev      # Starts on http://localhost:4000
```

**Terminal 2 - Frontend SPA:**
```bash
cd helpdesk-react
npm run dev      # Vite will display the local URL
```

### **Test Credentials**
| Email | Password | Role | Permissions |
|-------|----------|------|-------------|
| admin@example.com | password | admin | Full system access |
| agent@example.com | password | agent | Ticket management, assignments |
| customer@example.com | password | customer | Ticket creation, own tickets |

---

## 📁 Project Structure

```
devpulse/
├── REACT-SERVER/              # Backend API Service
│   ├── src/                   # TypeScript source code
│   ├── data/                  # SQLite database (auto-generated)
│   └── helpdesk.postman_collection.json
│
├── helpdesk-react/            # Frontend Application
│   ├── public/                # Static assets
│   ├── src/                   # React application code
│   └── vite.config.ts         # Build configuration
│
└── README.md                  # This documentation
```

---

## 📚 API Documentation

### **Interactive Documentation**
- **Swagger UI**: `http://localhost:4000/docs` - Full OpenAPI 3.0 specification
- **Postman Collection**: Import `helpdesk-api/helpdesk.postman_collection.json` for testing

### **Core API Endpoints**

#### Authentication
```
POST   /auth/register          # User registration (creates customer role)
POST   /auth/login             # Authentication with JWT token response
GET    /auth/me                # Current authenticated user profile
```

#### Tickets
```
GET    /tickets                # List tickets with enriched metadata
POST   /tickets                # Create ticket (auto-assigns creator)
GET    /tickets/:id            # Retrieve ticket by ID
PATCH  /tickets/:id            # Update ticket (status, priority, assignment)
DELETE /tickets/:id            # Delete ticket (soft delete ready)
```

#### Comments
```
POST   /tickets/:ticketId/comments    # Add comment with auto-enrichment
GET    /tickets/:ticketId/comments    # List comments with author details
```

#### Administration (Admin Role Required)
```
GET/POST  /users               # User management operations
GET/POST  /statuses            # Status lifecycle management
GET/POST  /priorities          # Priority level management
```

---

## 🔒 Security & Authentication

### **JWT Implementation**
- Tokens generated on successful authentication with embedded user context
- Frontend persists token in localStorage with automatic injection
- Backend validates tokens via middleware on all protected routes
- Payload structure: `{ userId, email, role, iat, exp }`

### **Role-Based Access Control (RBAC)**
```typescript
// Granular permission enforcement
requireRole(['admin', 'agent'])  // Multiple role authorization
requireRole(['admin'])            // Single role restriction
```

### **Security Features**
- Foreign key constraints ensure referential integrity
- Service layer input validation prevents malformed data
- Parameterized SQL queries eliminate injection vulnerabilities
- HTTP-only cookie support ready for production deployment

### **Database Schema**
```sql
users        → id, name, email, password, role, is_active, created_at
tickets      → id, subject, description, status_id, priority_id, 
               created_by, assigned_to, created_at, updated_at
comments     → id, ticket_id, author_id, content, created_at
statuses     → id, name
priorities   → id, name
```

---

## 🎓 Technical Excellence (Summary)

- Enterprise patterns: Repository, Service Layer, Clean Architecture, SOLID principles.
- Strict TypeScript: 100% type coverage, no `any` types, shared interfaces.
- Query optimization: JOINs, indexed columns, N+1 elimination.
- Developer experience: HMR, interactive API docs (Swagger, Postman), ESLint, error boundaries.
- All core business logic is hand-written, following best practices.

---

## 📈 Core Competencies Demonstrated

**Backend Engineering**
- RESTful API design with resource-oriented architecture
- Multi-layer application architecture with clear boundaries
- JWT authentication and session management
- Relational database design with normalization
- Advanced TypeScript in server environments
- Middleware composition and error handling patterns
- API documentation with OpenAPI standards

**Frontend Development**
- React 18 with modern Hooks patterns
- Advanced routing with programmatic navigation
- Context API for cross-cutting concerns
- Form validation and client-side error handling
- Responsive design and progressive enhancement
- TypeScript in React ecosystem

**Full-Stack Integration**
- RESTful client-server communication
- Token-based authentication flow implementation
- Role-based UI rendering and route protection
- Error propagation from server to user feedback
- Build optimization and bundle management

**Software Engineering Principles**
- Clean Code and SOLID principles
- DRY (Don't Repeat Yourself) methodology
- Separation of Concerns (SoC)
- Single Responsibility Principle
- Interface Segregation
- Dependency Inversion

---

## ⚡ Performance & Scalability

### **Current Optimizations**
- Single-trip database queries with JOIN operations
- Component memoization on frontend
- Lazy loading for route-based code splitting
- Efficient re-render prevention with React Context
- Indexed database columns for frequent queries

### **Production Readiness Checklist**
```
✓ TypeScript strict mode enabled
✓ Error boundaries implemented
✓ API rate limiting ready
✓ Database connection pooling compatible
✓ Environment-based configuration
✓ Logging infrastructure hooks
✓ CORS configuration prepared
□ Password hashing (bcrypt integration point identified)
□ Redis session store (architecture supports drop-in replacement)
□ Horizontal scaling (stateless design enables load balancing)
□ Docker containerization (Dockerfile templates available)
```

### **Scalability Considerations**
- **Stateless Architecture**: JWT enables horizontal scaling
- **Database Agnostic**: Repository pattern allows DB migration
- **Microservice Ready**: Layered design supports service extraction
- **CDN Compatible**: Static asset optimization prepared

---

## 🔧 Configuration & Deployment

### **Environment Variables**
```bash
# Backend (.env)
PORT=4000
JWT_SECRET=your_production_secret_here
DATABASE_PATH=./data/app.db
NODE_ENV=production

```

### **Build for Production**
```bash
# Backend
cd helpdesk-api
npm run build
npm start

# Frontend
cd helpdesk-react
npm run build
# Serve dist/ folder with your preferred static host
```

---

**Built with precision and attention to enterprise-grade software engineering principles.**