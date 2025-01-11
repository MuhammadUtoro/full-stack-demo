import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Create a DTO to match the Backend
export interface UserLoginDTO {
  userEmail: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = 'http://localhost:8080/login'; // this must match the backend endpoint in Quarkus

  // Constructor for Http Client
  constructor(private httpClient: HttpClient) {}

  // Function to user login
  userLogin(userLoginDTO: UserLoginDTO): Observable<any> {
    return this.httpClient.post(this.loginUrl, userLoginDTO);
  }
}
