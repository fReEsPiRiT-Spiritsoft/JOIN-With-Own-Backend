# JOIN API Endpoint Documentation

Basis-URL: http://<host>/api

Authentication: Alle Endpoints unter /contacts und /board-tasks benötigen einen Token-Header:
Authorization: Token <token>

---

## Authentication

### POST /auth/registration/
Beschreibung: Erstellt einen neuen Benutzer (erstellt automatisch einen Contact).

Request Body
```json
{
	"name": "Example Username",
	"email": "example@mail.de",
	"password": "ExamplePassword",
	"confirmPassword": "ExamplePassword",
	"acceptPrivacyPolicy": true
}
```

Success Response (201)
```json
{
	"message": "Registration successful",
	"token": "<token>",
	"user": {
		"id": 123,
		"email": "example@mail.de",
		"name": "Example Username",
		"createdAt": "2026-02-03T12:00:00Z"
	}
}
```

Status Codes
- 201: Benutzer erfolgreich erstellt
- 400: Ungültige Daten
- 500: Interner Serverfehler

---

### POST /auth/login/
Beschreibung: Authentifiziert einen Benutzer und liefert einen Token zurück.

Request Body
```json
{
	"email": "example@mail.de",
	"password": "ExamplePassword"
}
```

Success Response (200)
```json
{
	"message": "Login successful",
	"token": "<token>",
	"user": {
		"id": 123,
		"email": "example@mail.de",
		"name": "Example Username",
		"createdAt": "2026-02-03T12:00:00Z"
	}
}
```

Status Codes
- 200: Login erfolgreich
- 401: Invalid credentials

---

## Contacts

### GET /contacts/
Beschreibung: Kontakte auflisten.

---

### POST /contacts/
Beschreibung: Kontakt erstellen.

Request Body
```json
{
	"firstname": "Max",
	"lastname": "Mustermann",
	"email": "max@mail.de",
	"phone": "+49 123 456"
}
```

Success Response (201)
```json
{
	"id": 1,
	"firstname": "Max",
	"lastname": "Mustermann",
	"email": "max@mail.de",
	"phone": "+49 123 456"
}
```

---

### GET /contacts/{id}/
Beschreibung: Kontakt abrufen.

---

### PUT /contacts/{id}/
Beschreibung: Kontakt komplett aktualisieren.

Request Body
```json
{
	"firstname": "Max",
	"lastname": "Mustermann",
	"email": "max@mail.de",
	"phone": "+49 123 456"
}
```

---

### PATCH /contacts/{id}/
Beschreibung: Kontakt teilweise aktualisieren.

Request Body
```json
{
	"phone": "+49 999 888"
}
```

---

### DELETE /contacts/{id}/
Beschreibung: Kontakt löschen.

---

## Board Tasks

### GET /board-tasks/tasks/
Beschreibung: Tasks auflisten.

Query-Parameter
- viewMode (optional): public | private
- userId (optional, nur relevant bei viewMode=private)

---

### POST /board-tasks/tasks/
Beschreibung: Task erstellen.

Request Body
```json
{
	"title": "Design Landing",
	"description": "Create hero section",
	"dueDate": "2026-02-10",
	"priority": "urgent",
	"category": "Design",
	"status": "todo",
	"assignedTo": ["1", "2"],
	"subtasks": [{"id": "1", "title": "Wireframe", "completed": false}],
	"createdAt": "2026-02-03T12:00:00Z",
	"updatedAt": "2026-02-03T12:00:00Z",
	"order": 1,
	"isPrivate": false,
	"ownerId": "1"
}
```

---

### GET /board-tasks/tasks/{id}/
Beschreibung: Task abrufen.

---

### PUT /board-tasks/tasks/{id}/
Beschreibung: Task komplett aktualisieren.

---

### PATCH /board-tasks/tasks/{id}/
Beschreibung: Task teilweise aktualisieren.

---

### DELETE /board-tasks/tasks/{id}/
Beschreibung: Task löschen.

---

## Board Settings

### GET /board-tasks/board-settings/
Beschreibung: Board-Settings auflisten.

---

### POST /board-tasks/board-settings/
Beschreibung: Board-Settings erstellen.

Request Body
```json
{
	"userId": "1",
	"viewMode": "public",
	"lastChanged": "2026-02-03T12:00:00Z"
}
```

---

### GET /board-tasks/board-settings/{userId}/
Beschreibung: Board-Settings für User abrufen.

---

### PUT /board-tasks/board-settings/{userId}/
Beschreibung: Board-Settings komplett aktualisieren.

---

### PATCH /board-tasks/board-settings/{userId}/
Beschreibung: Board-Settings teilweise aktualisieren.

---

### DELETE /board-tasks/board-settings/{userId}/
Beschreibung: Board-Settings löschen.
