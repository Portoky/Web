import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {MyUser} from "./MyUser";
import {RestrictedUser} from "./User";

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  private backendUrl = "http://localhost/php/lab8/"; //prefix url to web api
  selectedId: string = "-1"
  constructor(private http: HttpClient) { }

  setSelectedId(newSelectedId: string){
    this.selectedId = newSelectedId;
  }

  fetchUsers(role: string, name: string) : Observable<string> {
    let params = new HttpParams();
    params = params.append('role', role);
    params = params.append('name', name);
    /* body of the method */
      return this.http.get<string>(this.backendUrl+'index.php',  { params : params, responseType: 'text' as 'json'});
  }

  getUserById(){
    let params = new HttpParams();
    params = params.append('id', this.selectedId)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.backendUrl+'update/getUserJson.php', {params: params});
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
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.backendUrl+'add/adduser.php', {params:params})

  }
  updateUser(name: string, username : string, password: string, role: string, email : string, age: number, webpage: string){
    let params = new HttpParams();
    params = params.append('name', name);
    params = params.append('username', username);
    params = params.append('password', password);
    params = params.append('role', role);
    params = params.append('email', email);
    params = params.append('age', age);
    params = params.append('webpage', webpage);
    params = params.append('id', this.selectedId);
    console.log(params)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.backendUrl+'update/updateuser.php', {params:params});
  }

  deleteUser(entityId: string){
    let params = new HttpParams();
    params = params.append('id', this.selectedId)
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(this.backendUrl+'removeuser.php', {params: params});
  }
}
