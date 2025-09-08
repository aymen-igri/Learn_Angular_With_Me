import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRoute } from './env/apiRoute';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) {}

  doCreate(userData: Object): Observable <any>{
    return this._httpclient.post(`${apiRoute}/users`,userData)
  }
}
