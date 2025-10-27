import { Component } from '@angular/core';

/**
 * Board Columns Component - Container für alle Kanban-Spalten
 *
 * Diese Component ist der Haupt-Container für die 4 Kanban-Spalten.
 * Sie managed das Layout und die Anordnung der einzelnen TaskColumn-Components.
 *
 * Enthält:
 * - 4x TaskColumn Components (To do, In progress, Await feedback, Done)
 * - Drag & Drop Container für spaltenübergreifendes Verschieben
 * - Responsive Layout-Grid für die Spalten
 *
 * Die eigentliche Task-Logik liegt in den TaskColumn Child-Components.
 */
@Component({
  selector: 'app-board-columns',
  imports: [],
  templateUrl: './board-columns.html',
  styleUrl: './board-columns.scss',
})
export class BoardColumns {}
