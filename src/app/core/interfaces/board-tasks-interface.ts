import { Timestamp } from '@angular/fire/firestore';

export interface Task {
  id?: string; 
  title: string;
  description: string;
  dueDate: Timestamp;
  priority: 'urgent' | 'medium' | 'low';
  category: string;
  status: 'todo' | 'inprogress' | 'awaitfeedback' | 'done';
  assignedTo: string[]; 
  subtasks: Subtask[];
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  order?: number;
  isPrivate?: boolean;  
  ownerId?: string;   
}

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}


export interface BoardSettings {
  userId: string;
  viewMode: 'public' | 'private';
  lastChanged?: any;
}