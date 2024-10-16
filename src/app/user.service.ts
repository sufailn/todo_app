import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.usersUrl}?username=${username}&password=${password}`);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user);
  }
}
