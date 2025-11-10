import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth-service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const savedUser = localStorage.getItem('currentUser');
  
  if (authService.isLoggedIn() && savedUser) {
    return true;
  }


  if (!savedUser) {
    authService.logout();
  }

  router.navigate(['/login']);
  return false;
};