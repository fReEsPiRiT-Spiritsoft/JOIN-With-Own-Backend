import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardTasksService } from '../../core/services/board-tasks-service';
import { Task } from '../../core/interfaces/board-tasks-interface';
import { BoardColumns } from './board-columns/board-columns';
import { TaskModal } from './task-modal/task-modal';
import { BoardHeader } from './board-header/board-header'; 

@Component({
  selector: 'app-board',
  imports: [CommonModule, BoardColumns, TaskModal, BoardHeader],
  templateUrl: './board.html',
  styleUrl: './board.scss',
  standalone: true,
})
export class Board implements OnInit {
  private taskService = inject(BoardTasksService);

  allTasks = {
    todo: [] as Task[],
    inprogress: [] as Task[],
    awaitfeedback: [] as Task[],
    done: [] as Task[]
  };

  columns = [
    { id: 'todo', title: 'To do', tasks: [] as Task[] },
    { id: 'inprogress', title: 'In progress', tasks: [] as Task[] },
    { id: 'awaitfeedback', title: 'Await feedback', tasks: [] as Task[] },
    { id: 'done', title: 'Done', tasks: [] as Task[] },
  ];

  showAddTaskModal = false;
  defaultStatus: 'todo' | 'inprogress' | 'awaitfeedback' | 'done' = 'todo';
  isLoading = true;
  searchQuery = '';

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.taskService.getTasksByStatus().subscribe({
      next: (tasks) => {
        this.allTasks.todo = tasks.todo;
        this.allTasks.inprogress = tasks.inprogress;
        this.allTasks.awaitfeedback = tasks.awaitfeedback;
        this.allTasks.done = tasks.done;
        
        this.updateDisplayedTasks();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
      },
    });
  }

  onSearch(query: string) {
    this.searchQuery = query.toLowerCase().trim();
    this.updateDisplayedTasks();
  }

  updateDisplayedTasks() {
    
    if (!this.searchQuery) {
      this.columns[0].tasks = this.allTasks.todo;
      this.columns[1].tasks = this.allTasks.inprogress;
      this.columns[2].tasks = this.allTasks.awaitfeedback;
      this.columns[3].tasks = this.allTasks.done;
    } else {
      this.columns[0].tasks = this.filterTasks(this.allTasks.todo);
      this.columns[1].tasks = this.filterTasks(this.allTasks.inprogress);
      this.columns[2].tasks = this.filterTasks(this.allTasks.awaitfeedback);
      this.columns[3].tasks = this.filterTasks(this.allTasks.done);
    }
  }

  filterTasks(tasks: Task[]): Task[] {
    const filtered = tasks.filter(task => {
      const matchesTitle = task.title.toLowerCase().includes(this.searchQuery);
      const matchesDescription = task.description && 
                                 task.description.toLowerCase().includes(this.searchQuery);
      
      return matchesTitle || matchesDescription;
    });
    
    return filtered;
  }

  openAddTaskModal(status: string) {
    this.defaultStatus = status as 'todo' | 'inprogress' | 'awaitfeedback' | 'done';
    this.showAddTaskModal = true;
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
  }

  async handleTaskCreated(task: Omit<Task, 'id' | 'createdAt'>) {
    try {
      await this.taskService.createTask(task);
      this.closeAddTaskModal();
      this.loadTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  }
}