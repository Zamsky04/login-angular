import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="min-h-screen bg-gray-100 font-sans">
      <header class="bg-white shadow-sm">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
          <a routerLink="/dashboard" class="text-xl font-bold text-gray-800 hover:text-indigo-600">
            Zamsky
          </a>
          <div class="flex items-center space-x-6">
            <a routerLink="/login" class="text-gray-600 hover:text-indigo-600">Login</a>
            <a routerLink="/register" class="text-gray-600 hover:text-indigo-600">Register</a>
          </div>
        </nav>
      </header>
      <main class="container mx-auto px-6 py-8">
        <router-outlet />
      </main>
    </div>
  `
})
export class AppComponent {}
