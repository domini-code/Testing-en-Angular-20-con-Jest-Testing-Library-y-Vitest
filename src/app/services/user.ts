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

  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._apiUrl}`);
  }

  getUserById(userId: string): Observable<User> {
    return this._http.get<User>(`${this._apiUrl}/${userId}`);
  }

  createUser(user: User): Observable<User> {
    return this._http.post<User>(`${this._apiUrl}`, { user });
  }

  updateUser(user: User): Observable<User> {
    return this._http.put<User>(`${this._apiUrl}/${user.id}`, { user });
  }

  deleteUser(userId: string): Observable<void> {
    return this._http.delete<void>(`${this._apiUrl}/${userId}`);
  }
}
