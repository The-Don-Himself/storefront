import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService, SnackBarService } from '../service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService)
  const snackBarService = inject(SnackBarService)

  const user = authService.getUser();
  if(user) return true

  snackBarService.presentToast('Please Login or Register first', 'warning')
  return router.navigate(['/login'])
};
