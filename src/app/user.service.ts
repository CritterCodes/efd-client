import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '/api/v1/users';

  constructor(
    private http: HttpClient,
    ) { }

  getUsers = (): Observable<User[]> => {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUser = (userID: string): Observable<User> => {
    return this.http.get<User>(`${this.usersUrl}/${userID}`);
  }

  deleteUser = (userID: string): Observable<Object> => {
    return this.http.delete(`${this.usersUrl}/${userID}`);
  }

  updateUser = (userID: string, user: User): Observable<User> => {
    return this.http.patch<User>(`${this.usersUrl}/${userID}`, user);
  }

  createUser = (user: User): Observable<User> => {
    return this.http.post<User>(`${this.usersUrl}`, user)
  }
}
