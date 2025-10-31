import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-selector',
  imports: [CommonModule],
  templateUrl: './priority-selector.html',
  styleUrl: './priority-selector.scss',
  standalone: true,
})
export class PrioritySelectorComponent {
  @Input() priority: 'urgent' | 'medium' | 'low' = 'medium';
  @Output() priorityChange = new EventEmitter<'urgent' | 'medium' | 'low'>();

  setPriority(priority: 'urgent' | 'medium' | 'low') {
    this.priority = priority;
    this.priorityChange.emit(priority);
  }
}
