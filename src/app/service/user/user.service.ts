import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CreateUserInterface } from '../../interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  signUp(userSignupData: CreateUserInterface) {
    return this.http.post<any>(`${environment.apiBaseUrl}/users`, userSignupData);
  }

  getUser(user_id: number) {
    return this.http.get<any>(`${environment.apiBaseUrl}/users/${user_id}`);
  }

}
