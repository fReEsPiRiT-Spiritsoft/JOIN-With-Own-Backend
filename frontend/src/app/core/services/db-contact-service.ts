/**
 * Service for accessing contact data from the backend API.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Contact } from '../interfaces/db-contact-interface';


@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = 'http://localhost:8000/api/contacts';

  constructor(private http: HttpClient) {}

  private authHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Token ${token}`,
    });
  }

  async getAllContacts(): Promise<Contact[]> {
    return await firstValueFrom(
      this.http.get<Contact[]>(`${this.apiUrl}/`, { headers: this.authHeaders() })
    );
  }

  async createContact(contact: Partial<Contact>): Promise<Contact> {
    return await firstValueFrom(
      this.http.post<Contact>(`${this.apiUrl}/`, contact, { headers: this.authHeaders() })
    );
  }

  async updateContact(contactId: string, contact: Partial<Contact>): Promise<Contact> {
    return await firstValueFrom(
      this.http.patch<Contact>(`${this.apiUrl}/${contactId}/`, contact, { headers: this.authHeaders() })
    );
  }

  async deleteContact(contactId: string): Promise<void> {
    await firstValueFrom(
      this.http.delete<void>(`${this.apiUrl}/${contactId}/`, { headers: this.authHeaders() })
    );
  }
}