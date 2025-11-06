import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  standalone: true
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  
  isLoggedIn = false;

  ngOnInit() {
    this.checkLoginStatus();
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = user !== null;
    });
  }

  private checkLoginStatus() {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
}