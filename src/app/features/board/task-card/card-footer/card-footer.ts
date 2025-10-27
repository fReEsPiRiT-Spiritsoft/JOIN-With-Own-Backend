import { Component } from '@angular/core';

/**
 * Card Footer Component - Zugewiesene User und Priority
 *
 * Diese Component zeigt den unteren Bereich einer Task-Card.
 *
 * Funktionen:
 * - Anzeige der zugewiesenen User als Avatare (ProfileBadge Components)
 * - Anzeige des Priority-Icons (PriorityIcon Component)
 * - Bei vielen Usern: Maximale Anzahl anzeigen + "+X" Badge
 *
 * Elemente:
 * - Links: Gestapelte User-Avatare (max. 3-4 sichtbar)
 * - Rechts: Priority-Icon (Urgent/Medium/Low)
 *
 * Input:
 * - assignedUsers: User[] (Array von zugewiesenen Usern)
 * - priority: string ('Urgent' | 'Medium' | 'Low')
 *
 * Layout: Flexbox mit Space-Between (Avatare links, Priority rechts)
 */
@Component({
  selector: 'app-card-footer',
  imports: [],
  templateUrl: './card-footer.html',
  styleUrl: './card-footer.scss',
})
export class CardFooter {}
