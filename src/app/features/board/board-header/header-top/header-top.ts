import { Component } from '@angular/core';

/**
 * Header Top Component - Oberer Header-Bereich mit Titel, Suche und Add-Button
 *
 * Diese Component stellt die erste Zeile des Board-Headers dar.
 * Sie enthält die wichtigsten Interaktionselemente für das Board:
 *
 * Elemente:
 * - Board-Titel ("Board")
 * - SearchInput Component: Suchfeld zum Filtern von Tasks
 * - AddButton Component: Plus-Button zum Hinzufügen neuer Tasks
 *
 * Layout: Horizontal angeordnet mit Flexbox (Titel links, Suche+Button rechts)
 */
@Component({
  selector: 'app-header-top',
  imports: [],
  templateUrl: './header-top.html',
  styleUrl: './header-top.scss',
})
export class HeaderTop {}
