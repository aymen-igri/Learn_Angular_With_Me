import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRoute } from '../env/apiRoute';
import { ILogin } from '../interfaces/ilogin';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _httpclient:HttpClient) {}

  doGet(userData: ILogin): Observable <any>{
    return this._httpclient.post(`${apiRoute}/auth/login`,userData)
  }
}
