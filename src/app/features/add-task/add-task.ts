import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Task, Subtask } from '../../core/interfaces/board-tasks-interface';
import { BoardTasksService } from '../../core/services/board-tasks-service';
import { Timestamp } from '@angular/fire/firestore';
import { AddTaskFormFields } from './add-task-form-fields/add-task-form-fields';

@Component({
  selector: 'app-add-task',
  imports: [CommonModule, AddTaskFormFields],
  templateUrl: './add-task.html',
  styleUrl: './add-task.scss',
  standalone: true,
})
export class AddTask {
  private taskService = inject(BoardTasksService);
  private router = inject(Router);

  @ViewChild(AddTaskFormFields) formFields!: AddTaskFormFields;

  showSuccessToast = false;

  async onSubmit() {
    if (!this.formFields.validateForm()) {
      return;
    }

    const dueDateTimestamp = this.convertDueDateToTimestamp();
    const newTask = this.createTaskObject(dueDateTimestamp);

    await this.taskService.createTask(newTask);
    this.displaySuccessAndNavigate();
  }

  private convertDueDateToTimestamp(): Timestamp {
    const [day, month, year] = this.formFields.dueDate.split('/');
    const dateObject = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return Timestamp.fromDate(dateObject);
  }

  private createTaskObject(dueDateTimestamp: Timestamp): Omit<Task, 'id' | 'createdAt'> {
    return {
      title: this.formFields.title.trim(),
      description: this.formFields.description.trim(),
      dueDate: dueDateTimestamp,
      priority: this.formFields.priority,
      category: this.formFields.category,
      status: 'todo',
      assignedTo: [...this.formFields.selectedContactIds],
      subtasks: this.formFields.subtasks,
    };
  }

  private displaySuccessAndNavigate(): void {
    this.showSuccessToast = true;

    setTimeout(() => {
      this.showSuccessToast = false;
      this.router.navigate(['/board']);
    }, 1500);
  }

  resetForm() {
    this.formFields.resetForm();
  }
}
