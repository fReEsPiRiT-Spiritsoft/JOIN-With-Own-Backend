import { Component } from '@angular/core';

/**
 * Card Progress Component - Subtask-Fortschrittsanzeige
 *
 * Diese Component zeigt den Fortschritt der Subtasks einer Task an.
 * Sie wird nur angezeigt, wenn die Task Subtasks hat.
 *
 * Funktionen:
 * - Visueller Fortschrittsbalken (z.B. 2/5 Subtasks erledigt)
 * - Berechnung des Prozentsatzes (completedSubtasks / totalSubtasks)
 * - Anzeige des Zählers "X/Y Subtasks"
 *
 * Input:
 * - completedSubtasks: number
 * - totalSubtasks: number
 *
 * Conditional Rendering: Wird nur bei totalSubtasks > 0 angezeigt
 */
@Component({
  selector: 'app-card-progress',
  imports: [],
  templateUrl: './card-progress.html',
  styleUrl: './card-progress.scss',
})
export class CardProgress {}
