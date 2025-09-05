import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="flex items-center justify-center">
      <div class="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 class="text-3xl font-extrabold text-center text-gray-900">Create your account</h2>
        <form (ngSubmit)="onSubmit()" #f="ngForm" class="space-y-6">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <input id="name" name="name" [(ngModel)]="name" required
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input id="email" name="email" [(ngModel)]="email" required type="email"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input id="password" name="password" [(ngModel)]="password" required type="password" minlength="6"
                   class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          </div>
          <div>
            <button type="submit" [disabled]="loading"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
              Create Account
            </button>
          </div>
          <p *ngIf="error" class="text-sm text-center text-red-600">{{error}}</p>
          <p class="text-sm text-center text-gray-600">
            Already have an account? <a routerLink="/login" class="font-medium text-indigo-600 hover:text-indigo-500">Login</a>
          </p>
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  name=''; email=''; password=''; loading=false; error='';
  constructor(private auth: AuthService, private router: Router) {}
  onSubmit() {
    this.loading = true; this.error='';
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: res => { this.auth.saveToken(res.token); this.router.navigateByUrl('/dashboard'); },
      error: err => { this.error = err?.error?.message || 'Register gagal'; this.loading = false; }
    });
  }
}
