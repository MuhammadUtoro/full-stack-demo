import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// We have to create an Interface of DTO and match our backend
export interface UserRegistrationDTO {
  userEmail: string;
  lastName: string;
  firstName: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  registerUrl = 'http://localhost:8081/register'; // This must our backend enpoint in Quarkus

  // Constructor for HttpClient
  constructor(private httpClient: HttpClient) {}

  // Function to user registration
  userRegister(
    userRegistrationDTO: UserRegistrationDTO
  ): Observable<UserRegistrationDTO> {
    return this.httpClient.post<UserRegistrationDTO>(
      this.registerUrl,
      userRegistrationDTO
    );
  }
}
