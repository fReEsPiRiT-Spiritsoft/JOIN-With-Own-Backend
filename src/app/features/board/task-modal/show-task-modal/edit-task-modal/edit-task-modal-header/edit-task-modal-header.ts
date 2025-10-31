import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal-header',
  imports: [CommonModule],
  templateUrl: './edit-task-modal-header.html',
  styleUrl: './edit-task-modal-header.scss',
  standalone: true,
})
export class EditTaskModalHeaderComponent {
  @Output() closeClick = new EventEmitter<void>();

  onCloseClick() {
    this.closeClick.emit();
  }
}
