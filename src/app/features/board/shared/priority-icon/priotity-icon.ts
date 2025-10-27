import { Component } from '@angular/core';

/**
 * Priority Icon Component - Prioritäts-Icons (Urgent / Medium / Low)
 *
 * Diese wiederverwendbare Component zeigt das passende Icon für die Task-Priorität an.
 *
 * Funktionen:
 * - Anzeige von 3 verschiedenen Priority-Icons:
 *   • Urgent: Rotes Icon mit Doppelpfeil nach oben
 *   • Medium: Oranges Icon mit gleichem Zeichen
 *   • Low: Grünes Icon mit Pfeil nach unten
 * - Farbcodierung für schnelle visuelle Erfassung
 * - SVG-basierte Icons für scharfe Darstellung
 *
 * Input:
 * - priority: 'Urgent' | 'Medium' | 'Low'
 *
 * Verwendet in: CardFooter, Task-Details, Add-Task-Form
 * Wiederverwendbar in allen Features!
 */
@Component({
  selector: 'app-priotity-icon',
  imports: [],
  templateUrl: './priotity-icon.html',
  styleUrl: './priotity-icon.scss',
})
export class PriotityIcon {}
