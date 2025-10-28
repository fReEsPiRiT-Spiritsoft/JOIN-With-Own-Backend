import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { BoardTasksService } from '../../core/services/board-tasks-service';
import { Task } from '../../core/interfaces/board-tasks-interface';
import { BoardColumns } from './board-columns/board-columns';
import { TaskModal } from './task-modal/task-modal';
import { ShowTaskModal } from './task-modal/show-task-modal/show-task-modal';
import { BoardHeader } from './board-header/board-header';

@Component({
  selector: 'app-board',
  imports: [CommonModule, BoardColumns, TaskModal, ShowTaskModal, BoardHeader],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  standalone: true,
})
export class Board implements OnInit, OnDestroy {
  private taskService = inject(BoardTasksService);
  private tasksSubscription?: Subscription;

  columns = [
    { id: 'todo', title: 'To do', tasks: [] as Task[] },
    { id: 'inprogress', title: 'In progress', tasks: [] as Task[] },
    { id: 'awaitfeedback', title: 'Await feedback', tasks: [] as Task[] },
    { id: 'done', title: 'Done', tasks: [] as Task[] },
  ];

  showAddTaskModal = false;
  showViewTaskModal = false;
  selectedTask: Task | null = null;
  defaultStatus: 'todo' | 'inprogress' | 'awaitfeedback' | 'done' = 'todo';
  isLoading = true;

  ngOnInit() {
    this.loadTasks();
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  loadTasks() {
    this.isLoading = true;
    this.tasksSubscription = this.taskService.getTasksByStatus().subscribe({
      next: (tasks) => {
        this.columns[0].tasks = tasks.todo;
        this.columns[1].tasks = tasks.inprogress;
        this.columns[2].tasks = tasks.awaitfeedback;
        this.columns[3].tasks = tasks.done;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.isLoading = false;
      },
    });
  }

  openAddTaskModal(status: string) {
    this.defaultStatus = status as 'todo' | 'inprogress' | 'awaitfeedback' | 'done';
    this.showAddTaskModal = true;
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
  }

  openViewTaskModal(task: Task) {
    this.selectedTask = task;
    this.showViewTaskModal = true;
  }

  closeViewTaskModal() {
    this.showViewTaskModal = false;
    this.selectedTask = null;
  }

  async handleTaskCreated(task: Omit<Task, 'id' | 'createdAt'>) {
    try {
      await this.taskService.createTask(task);
      this.closeAddTaskModal();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }

  handleEditTask(task: Task) {
    this.selectedTask = { ...task };
    this.loadTasks();
  }

  async handleDeleteTask(taskId: string) {
    try {
      await this.taskService.deleteTask(taskId);
      this.closeViewTaskModal();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }
}