import { Component } from '@angular/core';

/**
 * Task Column Component - Einzelne Kanban-Spalte (wiederverwendbar)
 *
 * Diese Component repräsentiert EINE Spalte im Kanban-Board.
 * Sie wird 4x verwendet für: To do, In progress, Await feedback, Done
 *
 * Funktionen:
 * - Anzeige aller Tasks einer bestimmten Status-Kategorie
 * - Drag & Drop Zone für Tasks (cdkDropList)
 * - Darstellung von TaskCard Components
 * - Falls keine Tasks vorhanden: Anzeige von ColumnEmpty Component
 *
 * Input Properties:
 * - tasks: Array von Tasks für diese Spalte
 * - status: Spalten-Status (todo, inprogress, awaitfeedback, done)
 *
 * Wiederverwendbar für alle 4 Spalten-Typen!
 */
@Component({
  selector: 'app-task-column',
  imports: [],
  templateUrl: './task-column.html',
  styleUrl: './task-column.scss',
})
export class TaskColumn {}
