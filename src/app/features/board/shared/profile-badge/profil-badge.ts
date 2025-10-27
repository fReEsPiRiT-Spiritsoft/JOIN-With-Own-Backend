import { Component } from '@angular/core';

/**
 * Profile Badge Component - User Avatar mit Initialen
 *
 * Diese wiederverwendbare Component zeigt einen User-Avatar als Kreis mit Initialen an.
 * Wird verwendet in: CardFooter, Kontaktliste, Header, etc.
 *
 * Funktionen:
 * - Anzeige von User-Initialen (z.B. "DL" für "Daniel Luzius")
 * - Farbiger Hintergrund (individuell pro User)
 * - Kreisförmiges Design
 * - Optionale Größenvarianten (small, medium, large)
 *
 * Input:
 * - user: User-Objekt (mit name, color)
 * - size?: 'small' | 'medium' | 'large' (optional, default: medium)
 *
 * Wiederverwendbar in allen Features des Projekts!
 */
@Component({
  selector: 'app-profil-badge',
  imports: [],
  templateUrl: './profil-badge.html',
  styleUrl: './profil-badge.scss',
})
export class ProfilBadge {}
