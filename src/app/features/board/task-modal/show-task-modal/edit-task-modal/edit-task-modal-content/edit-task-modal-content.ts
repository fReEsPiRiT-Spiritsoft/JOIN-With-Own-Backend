import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task-modal-content',
  imports: [CommonModule],
  templateUrl: './edit-task-modal-content.html',
  styleUrl: './edit-task-modal-content.scss',
  standalone: true,
})
export class EditTaskModalContentComponent {
  // Diese Komponente ist nur ein Wrapper für den scrollbaren Content
  // Der eigentliche Inhalt wird via ng-content projiziert
}
