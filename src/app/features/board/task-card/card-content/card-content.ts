import { Component } from '@angular/core';

/**
 * Card Content Component - Task-Titel und Beschreibung
 *
 * Diese Component zeigt den Hauptinhalt einer Task-Card an.
 *
 * Funktionen:
 * - Anzeige des Task-Titels (fett)
 * - Anzeige der Task-Beschreibung (Text kann abgeschnitten werden)
 * - Text-Overflow Handling bei langen Beschreibungen
 *
 * Input:
 * - title: string (Task-Titel)
 * - description: string (Task-Beschreibung)
 *
 * Layout: Vertikal gestapelt, Titel über Beschreibung
 */
@Component({
  selector: 'app-card-content',
  imports: [],
  templateUrl: './card-content.html',
  styleUrl: './card-content.scss',
})
export class CardContent {}
