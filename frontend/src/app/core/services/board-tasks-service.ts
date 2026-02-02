import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Task, BoardSettings } from '../interfaces/board-tasks-interface';
import { AuthService } from './auth-service';

@Injectable({
  providedIn: 'root',
})
export class BoardTasksService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private apiUrl = 'http://localhost:8000/api/board-tasks';
  private viewModeSubject = new BehaviorSubject<'public' | 'private'>('public');
  public viewMode$ = this.viewModeSubject.asObservable();
  private refreshSubject = new BehaviorSubject<void>(undefined);
  private refresh$ = this.refreshSubject.asObservable();

  private authHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Token ${token}`,
      }),
    };
  }

  constructor() {
    this.loadUserSettings();
  }

  /**
  * Loads the saved view mode setting for the current user from the API and updates the view mode subject. (currently deaktivated)
  */
  private async loadUserSettings() {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    try {
      const settings = await firstValueFrom(
        this.http.get<BoardSettings>(`${this.apiUrl}/board-settings/${user.id}/`, this.authHeaders())
      );
      if (settings?.viewMode) {
        this.viewModeSubject.next(settings.viewMode);
      }
    } catch (error: any) {
      if (error?.status === 404) {
        const created = await firstValueFrom(
          this.http.post<BoardSettings>(
            `${this.apiUrl}/board-settings/`,
            {
              userId: user.id,
              viewMode: this.viewModeSubject.value,
              lastChanged: new Date().toISOString(),
            },
            this.authHeaders()
          )
        );
        if (created?.viewMode) {
          this.viewModeSubject.next(created.viewMode);
        }
        return;
      }
      console.warn('Could not load board settings:', error);
    }
  }

  /**
 * Switches between public and private view modes for the current user and updates the setting via the API. (currently deaktivated)
 */
  async toggleViewMode(mode: 'public' | 'private'): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (!user?.id) return;
    await this.loadUserSettings();
    try {
      await firstValueFrom(
        this.http.put(
          `${this.apiUrl}/board-settings/${user.id}/`,
          {
            userId: user.id,
            viewMode: mode,
            lastChanged: new Date().toISOString(),
          },
          this.authHeaders()
        )
      );
    } catch (error: any) {
      if (error?.status === 404) {
        await firstValueFrom(
          this.http.post<BoardSettings>(
            `${this.apiUrl}/board-settings/`,
            {
              userId: user.id,
              viewMode: mode,
              lastChanged: new Date().toISOString(),
            },
            this.authHeaders()
          )
        );
      } else {
        throw error;
      }
    }
    this.viewModeSubject.next(mode);
  }

  /**
 * Retrieves all private tasks for a given user from the API.   (currently deaktivated)
 *
 * @param userId - The ID of the user whose private tasks should be fetched.
 * @returns An observable of the user's private tasks.
 */
  private getPrivateTasks(userId: string): Observable<Task[]> {
    const params = new HttpParams()
      .set('viewMode', 'private')
      .set('userId', userId);
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/`, {
      params,
      ...this.authHeaders(),
    });
  }

  /**
 * Retrieves all public tasks from the API (tasks that are not marked as private).
 *
 * @returns An observable of all public tasks.
 */
  private getPublicTasks(): Observable<Task[]> {
    const params = new HttpParams().set('viewMode', 'public');
    return this.http.get<Task[]>(`${this.apiUrl}/tasks/`, {
      params,
      ...this.authHeaders(),
    });
  }

  /**
   * Resolves which tasks to fetch based on the current view mode and user.
   *
   * @param viewMode - The current board view mode ('public' or 'private').
   * @param user - The current user object.
   * @returns An observable of the appropriate tasks.
   */
  private resolveTasks(viewMode: 'public' | 'private', user: any): Observable<Task[]> {
    if (viewMode === 'private' && user?.id) {
      return this.getPrivateTasks(user.id);
    } else {
      return this.getPublicTasks();
    }
  }

  /**
 * Returns all tasks for the current view mode and user as an observable.
 *
 * @returns An observable of all relevant tasks.
 */
  getAllTasks(): Observable<Task[]> {
    return combineLatest([
      this.viewMode$,
      this.authService.currentUser$,
      this.refresh$
    ]).pipe(
      switchMap(([viewMode, user]) => this.resolveTasks(viewMode, user))
    );
  }

  /**
 * Returns all tasks grouped by their status as an observable.
 *
 * @returns An observable with tasks grouped into 'todo', 'inprogress', 'awaitfeedback', and 'done'.
 */
  getTasksByStatus(): Observable<{
    todo: Task[];
    inprogress: Task[];
    awaitfeedback: Task[];
    done: Task[];
  }> {
    return this.getAllTasks().pipe(
      map((tasks) => ({
        todo: tasks.filter((t) => t.status === 'todo'),
        inprogress: tasks.filter((t) => t.status === 'inprogress'),
        awaitfeedback: tasks.filter((t) => t.status === 'awaitfeedback'),
        done: tasks.filter((t) => t.status === 'done'),
      })));
  }

  /**
   * Creates a new task via the API for the current user and view mode.
   *
   * @param task - The task data (without id and createdAt).
   * @returns A promise that resolves to the new task's ID.
   */
  async createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<string> {
    const user = this.authService.getCurrentUser();
    const currentViewMode = this.viewModeSubject.value;
    const taskData = {
      ...task,
      isPrivate: currentViewMode === 'private',
      ownerId: user?.id || 'guest',
      createdAt: new Date().toISOString(),
    };
    const created = await firstValueFrom(
      this.http.post<Task>(`${this.apiUrl}/tasks/`, taskData, this.authHeaders())
    );
    this.refreshSubject.next();
    return created.id || '';
  }

  /**
 * Returns the current view mode ('public' or 'private').
 *
 * @returns The current view mode.
 */
  getCurrentViewMode(): 'public' | 'private' {
    return this.viewModeSubject.value;
  }

  /**
 * Updates an existing task via the API with the provided updates.
 *
 * @param taskId - The ID of the task to update.
 * @param updates - The fields to update on the task.
 * @returns A promise that resolves when the update is complete.
 */
  async updateTask(taskId: string, updates: Partial<Task>): Promise<void> {
    try {
      await firstValueFrom(
        this.http.patch(`${this.apiUrl}/tasks/${taskId}/`, updates, this.authHeaders())
      );
      this.refreshSubject.next();
    } catch (error) {
      console.error('Task update failed:', error);
      throw error;
    }
  }

  /**
 * Updates the status of a task via the API and sets the updatedAt timestamp.
 *
 * @param taskId - The ID of the task to update.
 * @param newStatus - The new status for the task.
 * @returns A promise that resolves when the status is updated.
 */
  async updateTaskStatus(
    taskId: string,
    newStatus: 'todo' | 'inprogress' | 'awaitfeedback' | 'done'
  ): Promise<void> {
    await this.updateTask(taskId, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
    });
  }

  /**
 * Deletes a task via the API.
 *
 * @param taskId - The ID of the task to delete.
 * @returns A promise that resolves when the task is deleted.
 */
  async deleteTask(taskId: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.apiUrl}/tasks/${taskId}/`, this.authHeaders())
    );
    this.refreshSubject.next();
  }

  /**
 * Moves a task to a new status (column) via the API (used for drag & drop).
 *
 * @param taskId - The ID of the task to move.
 * @param newStatus - The new status for the task.
 * @returns A promise that resolves when the task is moved.
 */
  async moveTask(
    taskId: string,
    newStatus: 'todo' | 'inprogress' | 'awaitfeedback' | 'done'
  ): Promise<void> {
    await this.updateTask(taskId, { status: newStatus });
  }
}