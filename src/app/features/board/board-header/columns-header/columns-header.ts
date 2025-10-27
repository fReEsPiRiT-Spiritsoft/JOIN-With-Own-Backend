import { Component } from '@angular/core';

/**
 * Columns Header Component - Spalten-Titel-Zeile (NEU!)
 *
 * Diese Component zeigt die Überschriften für alle 4 Kanban-Spalten an.
 * Sie ist eine reine Präsentations-Component ohne eigene Logik.
 *
 * Spalten-Titel:
 * - To do
 * - In progress
 * - Await feedback
 * - Done
 *
 * Layout: Grid-Layout synchron mit den Board-Columns darunter
 * Zweck: Klare visuelle Trennung der Spalten für bessere UX
 */
@Component({
  selector: 'app-columns-header',
  imports: [],
  templateUrl: './columns-header.html',
  styleUrl: './columns-header.scss',
})
export class ColumnsHeader {}
