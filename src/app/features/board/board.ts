import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardTasksService } from '../../core/services/board-tasks-service';
import { Task } from '../../core/interfaces/board-tasks-interface';

/**
 * Board Component - Haupt-Component für das Kanban-Board
 *
 * Diese Component ist der zentrale Container für die Board-Ansicht.
 * Sie verwaltet alle Tasks und deren Verteilung auf die verschiedenen Spalten (Todo, In Progress, Await Feedback, Done).
 *
 * Hauptaufgaben:
 * - Laden aller Tasks aus dem Service
 * - Verwaltung der Task-Arrays für jede Spalte
 * - Koordination des gesamten Board-Layouts (Header + Columns)
 * - Bereitstellung der Drag & Drop Funktionalität
 */
@Component({
  selector: 'app-board',
  imports: [CommonModule, DragDropModule],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  standalone: true,
})
export class Board implements OnInit {
  private taskService = inject(BoardTasksService);

  todoTasks: Task[] = [];
  inprogressTasks: Task[] = [];
  awaitfeedbackTasks: Task[] = [];
  doneTasks: Task[] = [];

  isLoading = true;

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasksByStatus().subscribe({
      next: (tasks) => {
        this.todoTasks = tasks.todo;
        this.inprogressTasks = tasks.inprogress;
        this.awaitfeedbackTasks = tasks.awaitfeedback;
        this.doneTasks = tasks.done;
        this.isLoading = false;
        console.log('Loaded tasks:', tasks);
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      },
    });
  }
}
