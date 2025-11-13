import {
  Component,
  OnInit,
  inject,
  HostListener,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subtask } from '../../../core/interfaces/board-tasks-interface';
import { Contact } from '../../../core/interfaces/db-contact-interface';
import { ContactService } from '../../../core/services/db-contact-service';
import { PrioritySelectorComponent } from '../../../shared/components/priority-selector/priority-selector';
import { SubtaskManagerComponent } from '../../../shared/components/subtask-manager/subtask-manager';
import { ContactAssignmentDropdownComponent } from '../../../shared/components/contact-assignment-dropdown/contact-assignment-dropdown';

@Component({
  selector: 'app-add-task-form-fields',
  imports: [
    CommonModule,
    FormsModule,
    PrioritySelectorComponent,
    SubtaskManagerComponent,
    ContactAssignmentDropdownComponent,
  ],
  templateUrl: './add-task-form-fields.html',
  styleUrl: './add-task-form-fields.scss',
  standalone: true,
})
export class AddTaskFormFields implements OnInit {
  private contactService = inject(ContactService);

  @Input() title = '';
  @Input() description = '';
  @Input() dueDate = '';
  @Input() priority: 'urgent' | 'medium' | 'low' = 'medium';
  @Input() category = '';
  @Input() selectedContactIds: string[] = [];
  @Input() subtasks: Subtask[] = [];

  @Output() titleChange = new EventEmitter<string>();
  @Output() descriptionChange = new EventEmitter<string>();
  @Output() dueDateChange = new EventEmitter<string>();
  @Output() priorityChange = new EventEmitter<'urgent' | 'medium' | 'low'>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() selectedContactIdsChange = new EventEmitter<string[]>();
  @Output() subtasksChange = new EventEmitter<Subtask[]>();

  hiddenDateValue = '';
  minDate = this.getTodayDateString();
  showCategoryDropdown = false;

  contacts: Contact[] = [];
  categories = ['Technical Task', 'User Story'];

  titleError = false;
  dueDateError = false;
  dueDateErrorMessage = 'This field is required';
  categoryError = false;

  @ViewChild('datePicker') datePicker!: ElementRef<HTMLInputElement>;

  async ngOnInit() {
    await this.loadContacts();
  }

  async loadContacts() {
    this.contacts = await this.contactService.getAllContacts();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.showCategoryDropdown) {
      this.showCategoryDropdown = false;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInsideDropdown = target.closest('.dropdown-wrapper');

    if (!clickedInsideDropdown && this.showCategoryDropdown) {
      this.showCategoryDropdown = false;
    }
  }

  toggleCategoryDropdown() {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  selectCategory(category: string) {
    this.category = category;
    this.categoryChange.emit(this.category);
    this.categoryError = false;
    this.showCategoryDropdown = false;
  }

  formatDateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, '');

    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length >= 5) {
      value = value.substring(0, 5) + '/' + value.substring(5, 9);
    }

    this.dueDate = value;
    this.dueDateChange.emit(this.dueDate);
  }

  openDatePicker() {
    this.datePicker.nativeElement.showPicker();
  }

  onDatePickerChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const dateValue = input.value;

    if (dateValue) {
      const [year, month, day] = dateValue.split('-');
      this.dueDate = `${day}/${month}/${year}`;
      this.dueDateChange.emit(this.dueDate);
      this.dueDateError = false;
    }
  }

  getTodayDateString(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  onTitleChange() {
    this.titleChange.emit(this.title);
    this.titleError = false;
  }

  onDescriptionChange() {
    this.descriptionChange.emit(this.description);
  }

  onDueDateChange() {
    this.dueDateChange.emit(this.dueDate);
    this.dueDateError = false;
  }

  validateForm(): boolean {
    const isTitleValid = this.validateTitle();
    const isDueDateValid = this.validateDueDate();
    const isCategoryValid = this.validateCategory();

    return isTitleValid && isDueDateValid && isCategoryValid;
  }

  private validateTitle(): boolean {
    if (!this.title.trim()) {
      this.titleError = true;
      return false;
    }
    this.titleError = false;
    return true;
  }

  private validateDueDate(): boolean {
    if (!this.dueDate) {
      this.setDueDateError('This field is required');
      return false;
    }
    return this.validateDueDateFormat();
  }

  private validateDueDateFormat(): boolean {
    const [day, month, year] = this.dueDate.split('/');
    if (!day || !month || !year) {
      this.setDueDateError('Invalid date format');
      return false;
    }
    return this.checkDueDateNotInPast(day, month, year);
  }

  private checkDueDateNotInPast(day: string, month: string, year: string): boolean {
    const selectedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      this.setDueDateError('Date cannot be in the past');
      return false;
    }
    this.dueDateError = false;
    return true;
  }

  private setDueDateError(message: string): void {
    this.dueDateError = true;
    this.dueDateErrorMessage = message;
  }

  private validateCategory(): boolean {
    if (!this.category) {
      this.categoryError = true;
      return false;
    }
    this.categoryError = false;
    return true;
  }

  resetForm() {
    this.resetFormFields();
    this.resetFormErrors();
    this.emitFormChanges();
  }

  private resetFormFields(): void {
    this.title = '';
    this.description = '';
    this.dueDate = '';
    this.priority = 'medium';
    this.category = '';
    this.selectedContactIds = [];
    this.subtasks = [];
  }

  private resetFormErrors(): void {
    this.titleError = false;
    this.dueDateError = false;
    this.dueDateErrorMessage = 'This field is required';
    this.categoryError = false;
    this.showCategoryDropdown = false;
  }

  private emitFormChanges(): void {
    this.titleChange.emit(this.title);
    this.descriptionChange.emit(this.description);
    this.dueDateChange.emit(this.dueDate);
    this.priorityChange.emit(this.priority);
    this.categoryChange.emit(this.category);
    this.selectedContactIdsChange.emit(this.selectedContactIds);
    this.subtasksChange.emit(this.subtasks);
  }
}
