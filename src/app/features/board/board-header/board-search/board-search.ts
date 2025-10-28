import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-search',
  imports: [FormsModule],
  templateUrl: './board-search.html',
  styleUrl: './board-search.scss',
  standalone: true
})
export class BoardSearch {
  @Output() search = new EventEmitter<string>();
  searchValue = '';

  onSearchInput() {
    this.search.emit(this.searchValue);
  }
}