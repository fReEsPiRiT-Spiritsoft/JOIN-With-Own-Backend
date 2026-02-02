Hier ist eine Liste der wichtigsten Dateien, die du anpassen musst, um Firebase zu entfernen und auf dein eigenes Backend (z. B. Django, Port 8000) umzustellen:

1. Firebase-Initialisierung & Konfiguration:

src/app/app.config.ts
2. Interfaces mit Firestore-Typen:

src/app/core/interfaces/board-tasks-interface.ts
3. Board-Logik (Board-Komponente):

src/app/features/board/board.ts
4. Board Columns (z. B. Drag & Drop, Batch-Updates):

src/app/features/board/board-columns/board-columns.ts
5. Task Card Modal (Detailansicht, Live-Updates):

src/app/features/board/task-card/task-card-modal/task-card-modal.ts
6. Task Card Edit (Bearbeiten von Aufgaben):

src/app/features/board/task-card/task-card-edit/task-card-edit.ts
7. Summary (Übersicht, Deadlines):

src/app/features/summary/summary.ts
8. Weitere Services, die mit Firestore/Firebase arbeiten:

src/app/core/services/board-tasks-service.ts
src/app/core/services/db-contact-service.ts
src/app/core/services/auth-service.ts (falls Authentifizierung über Firebase lief)
Zusätzlich:

Entferne alle Importe von @angular/fire und firebase in allen betroffenen Dateien.
Passe die Datenübergabe (z. B. Timestamp → string/Date) an.






fertig:   Authentication (register, login)