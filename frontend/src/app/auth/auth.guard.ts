import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const canActivateAuth: CanActivateFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token');
  if (!token) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
