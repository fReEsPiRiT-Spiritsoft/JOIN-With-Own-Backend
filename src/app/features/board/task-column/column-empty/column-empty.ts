import { Component } from '@angular/core';

/**
 * Column Empty Component - "No tasks" Platzhalter
 *
 * Diese Component wird angezeigt, wenn eine Spalte keine Tasks enthält.
 *
 * Funktionen:
 * - Visuelle Rückmeldung für leere Spalten
 * - Zeigt "No tasks To do" / "No tasks In progress" etc.
 * - Verhindert, dass die Spalte komplett leer aussieht
 * - Drag & Drop Target bleibt aktiv (Tasks können hier abgelegt werden)
 *
 * Wird dynamisch angezeigt/ausgeblendet basierend auf tasks.length === 0
 */
@Component({
  selector: 'app-column-empty',
  imports: [],
  templateUrl: './column-empty.html',
  styleUrl: './column-empty.scss',
})
export class ColumnEmpty {}
