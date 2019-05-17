
import { TokenStorageService } from '../token-storage.service';
import { UserDetail } from '../model/user-detail';
import { User } from '../User.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionStore } from '../session/sessionstore';


const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  API_URL = 'http://localhost:8081/signin';

  constructor(private http: HttpClient, private router: Router, private token: TokenStorageService, private authStore: SessionStore) {}

  authenticateUser(user: User) {
    const basicAuthHeaderString = 'Basic ' + window.btoa(user.usernameOrEmail + ':' + user.password);
    const headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    });
    return this.http.get<string>(
      `${this.API_URL}`,
      {headers}).pipe(
        map(
          data => {
             sessionStorage.setItem('user', data);
             console.log(data);
          }
        )
      );
  }
  jwtAuthenticateUer(user: User): Observable<any> {

    return this.http.post(`${this.API_URL}`, user);
  }
  saveUser(user: UserDetail) {
    console.log(user);
    const url = 'http://localhost:8081/signup';
    return this.http.post(url, user);
  }

  getAllUsers(user: string) {
    const url = 'http://localhost:8081/getUsers';
    return this.http.post<UserResponse[]>(url, user);
  }
  logout() {
      window.sessionStorage.removeItem(TOKEN_KEY);
  }
  isLoggedIn() {
    if (window.sessionStorage.getItem(TOKEN_KEY)) {
      return true;
    } else {
     return false;
    }
  }

  getAllUsersList() {
    const url = 'http://localhost:8081/getAllUsers';
    return this.http.get<UserResponse[]>(url);
  }
  deleteUser(userId) {
    const url = 'http://localhost:8081/deleteUser/' + userId;
    return this.http.delete<UserResponse[]>(url);
  }

  getUserById(userId) {
    const url = 'http://localhost:8081/getUser/' + userId;
    return this.http.get<UserResponse>(url);
  }
  getRolesForUser(userId) {
    const url = 'http://localhost:8081/getRolesForUser/' + userId;
    return this.http.get<Role[]>(url);

  }

}
export class TokenResponse {
  accessToken: string;
  tokenType = 'Bearer';
}
export class UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
export class Role {
  roleId: number;
  name: string;
}
