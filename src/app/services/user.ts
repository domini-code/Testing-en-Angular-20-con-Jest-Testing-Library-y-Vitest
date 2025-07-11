import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly _apiUrl = '/api/users';
  private readonly _http = inject(HttpClient);

  getUser() {
    return { name: 'Juan' };
  }

  getUserById(userId: string): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(`${this._apiUrl}`, { body: user });
  }
}
