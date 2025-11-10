import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router'; 
import { 
  Firestore, 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc,
  Timestamp 
} from '@angular/fire/firestore';
import { User, LoginCredentials, RegisterData } from '.././interfaces/users-interface';
import { Contact } from '../interfaces/db-contact-interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private firestore = inject(Firestore);
  private router = inject(Router); 
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor() {
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

  /**
   * 
   */
  private listenToStorageChanges(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'currentUser') {
        if (event.newValue) {
          try {
            const user = JSON.parse(event.newValue);
            this.currentUserSubject.next(user);
            if (this.router.url === '/login' || this.router.url === '/signup') {
              this.router.navigate(['/summary']);
            }
          } catch (error) {
            console.error('Error parsing user from storage event:', error);
          }
        } else {
          this.currentUserSubject.next(null);
          const currentUrl = this.router.url;
          const publicPages = ['/login', '/signup', '/privacy-policy', '/legal-notice'];
          if (!publicPages.includes(currentUrl)) {
            this.router.navigate(['/login']);
          }
        }
      }
    });
  }

  async register(data: RegisterData): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const existingUser = await this.getUserByEmail(data.email);
      if (existingUser) {
        return { success: false, message: 'Email already exists' };
      }
      const hashedPassword = await this.hashPassword(data.password);
      const usersRef = collection(this.firestore, 'users');
      const docRef = await addDoc(usersRef, {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        createdAt: Timestamp.now()
      });

      const newUser: User = {
        id: docRef.id,
        name: data.name,
        email: data.email,
        password: hashedPassword,
        createdAt: new Date()
      };
      await this.createContactFromUser(newUser);
      return { success: true, message: 'Registration successful', user: newUser };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Registration failed' };
    }
  }

  private async createContactFromUser(user: User): Promise<void> {
    try {
      const contactsRef = collection(this.firestore, 'contacts');
      const contact: Omit<Contact, 'id'> = {
        firstname: user.name, 
        lastname: '', 
        email: user.email,
        phone: ''
      };
      await addDoc(contactsRef, contact);
      console.log('Contact created for user:', user.email);
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const user = await this.getUserByEmail(credentials.email); 
      if (!user) {
        return { success: false, message: 'Invalid email or password' };
      }
      const isPasswordValid = await this.verifyPassword(credentials.password, user.password);     
      if (!isPasswordValid) {
        return { success: false, message: 'Invalid email or password' };
      }
      const userWithoutPassword = { ...user, password: '' };
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      this.currentUserSubject.next(userWithoutPassword);
      return { success: true, message: 'Login successful', user: userWithoutPassword };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Login failed' };
    }
  }

  /**
   *  Guest Login
   */
  loginAsGuest(): void {
    const guestUser: User = {
      id: 'guest',
      email: 'guest@join.com',
      name: 'Guest User',
      password: '',
      createdAt: new Date()
    };
    
    localStorage.setItem('currentUser', JSON.stringify(guestUser));
    this.currentUserSubject.next(guestUser);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  private async getUserByEmail(email: string): Promise<User | null> {
    const usersRef = collection(this.firestore, 'users');
    const q = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      return null;
    }
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data() as User
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }

  private async verifyPassword(inputPassword: string, storedHash: string): Promise<boolean> {
    const inputHash = await this.hashPassword(inputPassword);
    return inputHash === storedHash;
  }
}