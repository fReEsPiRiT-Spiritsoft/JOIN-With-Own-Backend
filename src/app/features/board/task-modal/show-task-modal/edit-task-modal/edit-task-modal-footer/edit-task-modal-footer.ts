import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal-footer',
  imports: [CommonModule],
  templateUrl: './edit-task-modal-footer.html',
  styleUrl: './edit-task-modal-footer.scss',
  standalone: true,
})
export class EditTaskModalFooterComponent {
  @Output() submitClick = new EventEmitter<void>();

  onSubmitClick() {
    this.submitClick.emit();
  }
}
