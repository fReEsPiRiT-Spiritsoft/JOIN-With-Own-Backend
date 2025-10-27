import { Component } from '@angular/core';

/**
 * Card Category Component - Category Badge (User Story / Technical Task)
 *
 * Diese Component zeigt den Kategorie-Badge am oberen Rand einer Task-Card.
 *
 * Funktionen:
 * - Anzeige der Task-Kategorie als farbiger Badge
 * - Zwei Varianten: "User Story" (blau) oder "Technical Task" (grün)
 * - Farbcodierung für schnelle visuelle Unterscheidung
 *
 * Input:
 * - category: string ('User Story' | 'Technical Task')
 *
 * Styling: Farbige Badges mit abgerundeten Ecken
 */
@Component({
  selector: 'app-card-category',
  imports: [],
  templateUrl: './card-category.html',
  styleUrl: './card-category.scss',
})
export class CardCategory {}
