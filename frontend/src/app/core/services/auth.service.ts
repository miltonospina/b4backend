import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../models/usuario';

export const TOKEN_NAME = 'jwt_token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: Usuario;
  private userData = new BehaviorSubject<Usuario>(null);
  userData$ = this.userData.asObservable();

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    const data = this.getTokenData(token);
    console.log(data);
    this.user = {userName: data.sub, email: data.email, id: data.nameid };
    this.userData.next(this.user);
    console.log(this.user);

  }

  deleteToken(): void{
    localStorage.removeItem(TOKEN_NAME);
    this.user = null;
  }

  getTokenExpirationDate(token: string): Date {
    const helper = new JwtHelperService();
    const expirationDate = helper.getTokenExpirationDate(token);
    return expirationDate;
  }

  getTokenData(token: string): any {
    const helper = new JwtHelperService();
    const data = helper.decodeToken(token);
    return data;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) { token = this.getToken(); }
    if (!token) { return true; }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) { return false; }
    return !(date.valueOf() > new Date().valueOf());
  }

  registrarUsuario(email: string, password: string): Observable<any> {
    return this.http.post(`${environment.urlApi}Account/Register`, { email, password });
  }


  login(email: string, password: string): Promise<any> {
    return this.http
      .post(`${environment.urlApi}Account/Login`, { email, password })
      .toPromise()
      .then(res => res);
  }
}