import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User, LoginCredentials, RegisterData } from '../interfaces/users-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkLocalStorage();
    this.listenToStorageChanges();
  }

  private checkLocalStorage(): void {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        this.currentUserSubject.next(user);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  private listenToStorageChanges(): void {
    window.addEventListener('storage', (event) => this.handleStorageEvent(event));
  }

  private handleStorageEvent(event: StorageEvent): void {
    if (event.key === 'currentUser') {
      if (event.newValue) {
        this.handleUserLoginFromStorage(event.newValue);
      } else {
        this.handleUserLogoutFromStorage();
      }
    }
  }

  private handleUserLoginFromStorage(newValue: string): void {
    try {
      const user = JSON.parse(newValue);
      this.currentUserSubject.next(user);
      this.redirectIfOnAuthPage();
    } catch (error) {
      console.error('Error parsing user from storage event:', error);
    }
  }

  private redirectIfOnAuthPage(): void {
    if (this.router.url === '/login' || this.router.url === '/signup') {
      this.router.navigate(['/summary']);
    }
  }

  private handleUserLogoutFromStorage(): void {
    this.currentUserSubject.next(null);
    this.redirectIfNotOnPublicPage();
  }

  private redirectIfNotOnPublicPage(): void {
    const currentUrl = this.router.url;
    const publicPages = ['/login', '/signup', '/privacy-policy', '/legal-notice'];
    if (!publicPages.includes(currentUrl)) {
      this.router.navigate(['/login']);
    }
  }

  // Registrierung über das Backend
  async register(data: RegisterData): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response = await firstValueFrom(
        this.http.post<any>(`${this.apiUrl}/registration/`, data)
      );
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      if (response?.user) {
        this.storeCurrentUser(response.user);
      }
      return { success: true, message: response?.message || 'Registration successful', user: response?.user };
    } catch (error: any) {
      const message = this.extractErrorMessage(error) || 'Registration failed';
      return { success: false, message };
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: User }> {
  try {
    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/login/`, credentials)
    );
    if (response?.token) {
      localStorage.setItem('token', response.token);
    }
    if (response?.user) {
      this.storeCurrentUser(response.user);
    }
    return { success: true, message: response.message, user: response.user };
  } catch (error: any) {
    const message = this.extractErrorMessage(error) || 'Invalid email or password';
    return { success: false, message };
  }
}

  async loginAsGuest(): Promise<{ success: boolean; message: string }> {
  try {
    const response = await firstValueFrom(
      this.http.post<any>(`${this.apiUrl}/guest-login/`, {})
    );
    if (response?.token) {
      localStorage.setItem('token', response.token);
    }
    if (response?.user) {
      this.storeCurrentUser(response.user);
    }
    return { success: true, message: response.message };
  } catch (error: any) {
    return { success: false, message: 'Guest login failed' };
  }
}

  logout(): void {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private storeCurrentUser(user: User): void {
    const userWithoutPassword = { ...user, password: '' };
    localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    this.currentUserSubject.next(userWithoutPassword);
  }

  private extractErrorMessage(error: any): string | null {
    const apiMessage = error?.error?.detail || error?.error?.message;
    if (typeof apiMessage === 'string') return apiMessage;
    return null;
  }
}