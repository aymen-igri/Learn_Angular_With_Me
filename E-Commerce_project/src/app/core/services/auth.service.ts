import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiRoute } from '../env/apiRoute';
import { IRegister } from '../interfaces/iregister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _httpclient:HttpClient) {}

  doCreate(userData: IRegister): Observable <any>{
    return this._httpclient.post(`${apiRoute}/users`,userData)
  }
}
