import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-task-form-fields',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-task-form-fields.html',
  styleUrl: './edit-task-form-fields.scss',
  standalone: true,
})
export class EditTaskFormFieldsComponent {
  @Input() title = '';
  @Input() description = '';
  @Input() dueDate = '';
  @Input() titleError = false;
  @Input() dueDateError = false;

  @Output() titleChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() dueDateChange = new EventEmitter<string>();
  @Output() titleErrorChange = new EventEmitter<boolean>();
  @Output() dueDateErrorChange = new EventEmitter<boolean>();

  onTitleChange(value: string) {
    this.title = value;
    this.titleChange.emit(value);
    if (this.titleError) {
      this.titleError = false;
      this.titleErrorChange.emit(false);
    }
  }

  onDescriptionChange(value: string) {
    this.description = value;
    this.descriptionChange.emit(value);
  }

  onDueDateChange(value: string) {
    this.dueDate = value;
    this.dueDateChange.emit(value);
    if (this.dueDateError) {
      this.dueDateError = false;
      this.dueDateErrorChange.emit(false);
    }
  }
}
