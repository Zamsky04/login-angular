import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Ganti URL ini jika backend Anda berbeda
  private authApiUrl = 'http://localhost:8080/api/auth';
  private userApiUrl = 'http://localhost:8080/api/users'; // URL untuk user endpoint

  constructor(private http: HttpClient, private router: Router) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/register`, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.authApiUrl}/login`, { email, password });
  }

  /**
   * PERBAIKAN: Method baru untuk mengambil data user yang sedang login.
   * Method ini akan memanggil endpoint /api/users/me di backend.
   */
  me(): Observable<any> {
    return this.http.get(`${this.userApiUrl}/me`);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Di sini method logout sudah meng-handle navigasi
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
