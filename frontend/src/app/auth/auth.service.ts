import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface AuthResponse { token: string; name: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/login', { email, password });
  }
  register(name: string, email: string, password: string) {
    return this.http.post<AuthResponse>('/api/auth/register', { name, email, password });
  }
  me() { return this.http.get('/api/auth/me'); }
  saveToken(t: string) { localStorage.setItem('token', t); }
  logout() { localStorage.removeItem('token'); }
}
