import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserInterface, UserLoginInterface } from '../../interface';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '..';
import { jwtDecode } from "jwt-decode";

const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public _$user = new BehaviorSubject<UserInterface | null>(null);
  public _$token = new BehaviorSubject<string | null>(null);

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  login(userLoginData: UserLoginInterface) {
    return this.http.post<any>(`${environment.apiBaseUrl}/auth/login`, userLoginData);
  }

  setUp(){
    const token = this.storageService.getItem(TOKEN_KEY);

    if(!token) return

    this.setToken(token);

    const user: UserInterface  = jwtDecode<UserInterface>(token);
    this.setUser(user);
  }

  storeToken(token: string) {
    this.storageService.storeItem(TOKEN_KEY, token);
  }

  setUser(user: UserInterface | null) {
    this._$user.next(user);
  }

  setToken(token: string) {
    this._$token.next(token);
  }

  async logout() {
    this.storageService.clear();
    this._$user.next(null);
    this._$token.next(null);
  }

}
