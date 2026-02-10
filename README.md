# JOIN — Fullstack Kanban Project Management

A modern, collaborative Kanban board built with Angular 19 (frontend) and Django REST Framework (backend).

---

## 🚀 Quick Overview

- Frontend: Angular 19 (Standalone Components) — TypeScript, SCSS
- Backend: Django 6 + Django REST Framework — Token Authentication
- Database: SQLite (development) / PostgreSQL (production-ready)
- API base: http://localhost:8000/api

---

## 📁 Project Structure

```
join-fullstack/
├── frontend/          # Angular 19 SPA (src/app/...)
├── backend/           # Django REST API (apps: user_auth_app, contacts_app, board_tasks_app)
└── README.md          # This file
```

---

## ✨ Features

### Kanban Board
- Four columns: To Do, In Progress, Await Feedback, Done
- Drag & Drop (Angular CDK)
- Search, filter and priority levels (urgent, medium, low)

### Tasks
- Subtasks with progress
- Assign contacts to tasks
- Categories, due dates, ordering and full CRUD

### Contacts
- Contact CRUD (firstname, lastname, email, phone)
- Can be assigned to tasks

### Authentication
- Token-based auth (DRF TokenAuthentication)
- Registration and login endpoints
- Guest login endpoint to obtain a token for anonymous access

---

## 🔧 Local Setup

Prerequisites: Node.js ≥ 18, Python ≥ 3.13, npm ≥ 9, Angular CLI ≥ 19

### Backend

1. cd backend
2. python -m venv .venv
3. source .venv/bin/activate  # Linux / macOS
4. pip install -r requirements.txt
5. cp .env.example .env  # edit .env as needed
6. python manage.py migrate
7. python manage.py createsuperuser
8. python manage.py runserver

Backend runs at: http://localhost:8000

### Frontend

1. cd frontend
2. npm install
3. ng serve

Frontend runs at: http://localhost:4200

---

## 📚 API Reference (high level)

Authentication (no token required):
- POST /api/auth/registration/ — Register a new user (returns token)
- POST /api/auth/login/ — Login (returns token)
- POST /api/auth/guest-login/ — Guest login (returns token)

Notes: Use `Authorization: Token <token>` header for authenticated requests.

Contacts (requires token):
- GET /api/contacts/ — List contacts
- POST /api/contacts/ — Create contact
- GET /api/contacts/{id}/ — Retrieve
- PUT/PATCH /api/contacts/{id}/ — Update
- DELETE /api/contacts/{id}/ — Delete

Board Tasks (requires token):
- GET /api/board-tasks/tasks/?viewMode=public|private&userId=<id> — List tasks
- POST /api/board-tasks/tasks/ — Create task
- GET /api/board-tasks/tasks/{id}/ — Retrieve task
- PUT/PATCH /api/board-tasks/tasks/{id}/ — Update task
- DELETE /api/board-tasks/tasks/{id}/ — Delete task

Board Settings (requires token):
- GET /api/board-tasks/board-settings/ — List settings
- POST /api/board-tasks/board-settings/ — Create settings
- GET /api/board-tasks/board-settings/{userId}/ — Retrieve by userId
- PUT/PATCH /api/board-tasks/board-settings/{userId}/ — Update
- DELETE /api/board-tasks/board-settings/{userId}/ — Delete

---

## ✅ Testing & Quality
- Backend: run Django tests via `python manage.py test`
- Frontend: run `npm test` (if configured)
- Code style: PEP8 for backend, TypeScript strict mode for frontend

---

## Contributing
- Fork the repo, create a feature branch and open a PR.
- Please include tests for backend changes.

---

## Team
- Daniel Luzius — danielluzius.de
- Kajanan Yoganathan — kajanan.dev
- Patrick Schmidt — patrick-schmidt.info

---

License: This project was created as part of the Developer Akademie program.

Made with ❤️ in Germany
