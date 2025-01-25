import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

// Create DTO to match the backend
export interface UserDTO {
  lastName: string;
  firstName: string;
  userEmail: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  userUrl = 'http://localhost:8081/users';

  // Constructor for Http Client
  constructor(
    private httpClient: HttpClient,
    private loginService: LoginService
  ) {}

  // Get the JWT token
  private getToken(): string {
    return this.loginService.getToken();
  }

  // Function to get all users
  getAllUsers(): Observable<UserDTO[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpClient.get<UserDTO[]>(this.userUrl, { headers });
  }
}
