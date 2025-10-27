import { Component } from '@angular/core';

/**
 * Board Header Component - Container für den gesamten Header-Bereich des Boards
 *
 * Diese Component orchestriert alle Header-Elemente des Kanban-Boards.
 * Sie ist der zentrale Container für:
 * - HeaderTop: Titel, Suchfeld und Add-Button
 * - ColumnsHeader: Die Spalten-Überschriften (To do, In progress, etc.)
 *
 * Struktur:
 * Board Header
 * ├── Header Top (Titel + Suche + Button)
 * └── Columns Header (Spalten-Titel-Zeile)
 */
@Component({
  selector: 'app-board-header',
  imports: [],
  templateUrl: './board-header.html',
  styleUrl: './board-header.scss',
})
export class BoardHeader {}
