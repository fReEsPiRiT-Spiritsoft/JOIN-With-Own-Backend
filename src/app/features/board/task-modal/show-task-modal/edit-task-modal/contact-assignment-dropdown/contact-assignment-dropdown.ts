import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../../../../../../core/interfaces/db-contact-interface';

@Component({
  selector: 'app-contact-assignment-dropdown',
  imports: [CommonModule],
  templateUrl: './contact-assignment-dropdown.html',
  styleUrl: './contact-assignment-dropdown.scss',
  standalone: true,
})
export class ContactAssignmentDropdownComponent {
  @Input() contacts: Contact[] = [];
  @Input() selectedContactIds: string[] = [];
  @Output() selectedContactIdsChange = new EventEmitter<string[]>();

  showContactDropdown = false;

  toggleContactDropdown() {
    this.showContactDropdown = !this.showContactDropdown;
  }

  toggleContact(contactId: string) {
    const index = this.selectedContactIds.indexOf(contactId);
    const updatedIds = [...this.selectedContactIds];

    if (index > -1) {
      updatedIds.splice(index, 1);
    } else {
      updatedIds.push(contactId);
    }

    this.selectedContactIds = updatedIds;
    this.selectedContactIdsChange.emit(updatedIds);
  }

  isContactSelected(contactId: string): boolean {
    return this.selectedContactIds.includes(contactId);
  }

  getSelectedContacts(): Contact[] {
    return this.contacts.filter((c) => this.selectedContactIds.includes(c.id!));
  }

  getInitials(contact: Contact): string {
    if (!contact || !contact.firstname) return '';
    const nameParts = contact.firstname.trim().split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    const firstInitial = nameParts[0].charAt(0);
    const lastInitial = nameParts[nameParts.length - 1].charAt(0);
    return (firstInitial + lastInitial).toUpperCase();
  }

  colorPalette = [
    '#FF7A00',
    '#9327FF',
    '#6E52FF',
    '#FC71FF',
    '#FFBB2B',
    '#1FD7C1',
    '#462F8A',
    '#FF4646',
    '#00BEE8',
    '#FF5EB3',
    '#FF745E',
    '#FFA35E',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
  ];

  getAvatarColor(contact: Contact): string {
    let hash = 0;
    const idString = String(contact.id);
    for (let i = 0; i < idString.length; i++) {
      hash = idString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % this.colorPalette.length;
    return this.colorPalette[index];
  }

  closeDropdown() {
    this.showContactDropdown = false;
  }
}
