# 🚀 DevPulse: Enterprise SDLC Management Platform

**DevPulse** is a professional B2B SaaS ecosystem engineered to optimize the Software Development Life Cycle (SDLC). It serves as a strategic bridge between high-level **Product Requirements (ClientPM)** and **Technical Execution (Developer/TeamLead)**. By centralizing the Triage process, DevPulse eliminates communication silos and ensures high-velocity delivery.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology Stack |
| :--- | :--- |
| **Frontend** | React.js (Hooks, Functional Components) |
| **State Management** | React Context API (Global Auth & User State) |
| **Routing** | React Router v6 (Protected & Role-Based Routes) |
| **Backend** | Node.js, TypeScript, SQLite |
| **Auth Strategy** | JWT (JSON Web Token) with Persistent LocalStorage |
| **UI/UX** | Responsive CSS, Dynamic Loading States, Error Boundaries |

---

## 🌟 Core Capabilities

* **Role-Based Access Control (RBAC):** Tailored environments for distinct organizational roles.
* **Dynamic Triage Engine:** TeamLeads can efficiently evaluate, prioritize, and delegate tickets.
* **Real-Time Monitoring:** Instant visibility into ticket status, priority shifts, and ownership.
* **Contextual Collaboration:** A robust threaded comment system integrated into every ticket.
* **Advanced Data Filtering:** Multi-layered filtering by status, priority, and string-based search.

---

## 👤 Stakeholder Workflows

### 🔹 ClientPM (The Product Owner)
* **Initiate Requirements:** Seamlessly convert client needs into actionable tickets.
* **Lifecycle Tracking:** Monitor the real-time progression of requested features.
* **Feedback Loop:** Engage directly with the development team via ticket-level comments.

### 🔹 Developer (The Executor)
* **Focus-Driven Dashboard:** A curated view of assigned tasks to minimize "noise."
* **Status Management:** Full control over the ticket lifecycle from *Open* to *Resolved*.
* **Technical Updates:** Provide progress logs and request clarifications in-situ.

### 🔹 TeamLead (The Orchestrator)
* **Strategic Oversight:** 360-degree view of the entire project ticket backlog.
* **Resource Allocation:** Direct assignment of tasks to Developers based on workload.
* **Global Triage:** Execute bulk status updates and high-level priority management.

---

## 🏗️ Project Structure & Routing

The application implements a strict **Separation of Concerns (SoC)**:
* `/login` — Public entry point with secure credential validation.
* `/dashboard` — Smart-routing hub that directs users based on their authenticated role.
* `/tickets` — Unified ticket registry with client-side filtering logic.
* `/tickets/:id` — Deep-dive view for ticket metadata and communication history.
* `/tickets/new` — Secure entry form restricted to the ClientPM role.

---

## 📁 Project Folder Structure


```
helpdesk-react/
├── public/                # Static assets (favicon, index.html, etc.)
├── src/                   # Application source code
│   ├── assets/            # Images, fonts, and static resources
│   ├── components/        # All React UI components (grouped by feature)
│   │   ├── Comments/      # Ticket comment components
│   │   ├── Dashboards/    # Role-based dashboard views
│   │   ├── Froms/         # Form components and validation
│   │   ├── styleComponnents/ # Styled UI elements (buttons, fields, alerts)
│   │   ├── Tickets/       # Ticket CRUD and display components
│   │   ├── Users/         # User management components
│   ├── contexts/          # React Contexts (theme, auth, etc.)
│   ├── guards/            # Route and role-based access guards
│   ├── models/            # TypeScript models/interfaces (User, Ticket, etc.)
│   ├── service/           # API calls and business logic
│   ├── store/             # Redux slices and global state management
│   ├── App.tsx            # Main React app component
│   ├── main.tsx           # App entry point
│   ├── routes.tsx         # Route definitions
│   └── StyleDefinitions.tsx # Global style definitions
├── package.json           # Project metadata and dependencies
├── tsconfig*.json         # TypeScript configuration files
├── vite.config.ts         # Vite build configuration
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
└── README.md              # Project documentation
```

---

## ⚡ Getting Started

**Installation:**
```bash
npm install

**Launch Development Environment:**
```bash
npm run dev

---
## 🏆 Development Excellence & Standards

This project was developed with a focus on **Production-Ready** standards:

* **Component Reusability:** Implementation of atomic design principles for UI components.
* **Clean Code:** Strict adherence to ESLint standards and **DRY** (Don't Repeat Yourself) principles.
* **Manual Mastery:** To ensure absolute control over the application logic, this project was developed **without AI generation** for core business logic, demonstrating a deep understanding of React's internal mechanisms and state synchronization.

---
*Created by the DevPulse Team. For further information, please contact the project maintainer.*