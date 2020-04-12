import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: User;
  private baseUrl = 'http://localhost:8000';
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/create', user, {headers: this.headers});
  }

  readUsers() {
    return this.http.get(this.baseUrl + '/read', {headers: this.headers});
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + '/update', user, {headers: this.headers});
  }

  deleteUser(id: string) {
    return this.http.delete(this.baseUrl + '/delete/' + id, {headers: this.headers});
  }
  setter(user: User) {
    this.user = user;
  }
  getter() {
    return this.user;
  }
}
