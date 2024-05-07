import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {MyUser} from "./MyUser";

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private backendUrl = "http://localhost/php/lab8/"; //prefix url to web api
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private http: HttpClient) { }

  fetchUsers(role: string, name: string) : Observable<string> {
    let params = new HttpParams();
    params = params.append('role', role);
    params = params.append('name', name);
    /* body of the method */
      return this.http.get<string>(this.backendUrl+'index.php',  { params : params, responseType: 'text' as 'json'});
  }

  addUser(name: string, username : string, password: string, role: string, email : string, age: string, webpage: string){
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('username', username);
    params = params.append('password', password);
    params = params.append('role', role);
    params = params.append('email', email);
    params = params.append('age', age);
    params = params.append('webpage', webpage);

    //const url = `${this.backendUrl}add/adduser.php?name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}&role=${encodeURIComponent(role)}&email=${encodeURIComponent(email)}&age=${encodeURIComponent(age)}&webpage=${encodeURIComponent(webpage)}`;
    //return this.http.post(url, null);
    return this.http.post<string>(this.backendUrl+'add/adduser.php',  {
      name: name,
      username: username,
      password: password,
      role: role,
      email: email,
      age: age,
      webpage: webpage
    });
  }

}
