import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface AuthResponse { token: string; name: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, { email, password });
  }
  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, { name, email, password });
  }
  me() { return this.http.get(`${this.apiUrl}/auth/me`); }
  saveToken(t: string) { localStorage.setItem('token', t); }
  logout() { localStorage.removeItem('token'); }
}
