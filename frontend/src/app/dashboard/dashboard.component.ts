// frontend/src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <h2 class="text-2xl font-semibold text-gray-800">Welcome to your Dashboard</h2>
      </div>
      <div class="p-6">
        <div class="flex items-center space-x-4">
          <button (click)="loadMe()"
                  class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Load My Profile
          </button>
          <button (click)="logout()"
                  class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75">
            Logout
          </button>
        </div>

        <div *ngIf="me" class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 class="text-lg font-medium text-gray-900 mb-2">Profile Information</h3>
          <pre class="text-sm text-gray-800 whitespace-pre-wrap">{{ me | json }}</pre>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  me: any;
  constructor(private auth: AuthService) {}

  loadMe(){
    this.auth.me().subscribe(r => this.me = r);
  }
  logout(){
    this.auth.logout();
  }
}
