import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Crud } from '../crud/crud';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Response } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";

@Injectable()
export class UserService implements Crud<User>{

  //API PROJECT : https://github.com/JoanVasquez/restful-jersey-example
  private userUrl: string = 'http://localhost:8080/usermanagmentapi/webapi/user';

  constructor(private http: HttpClient) { }

  private getHeader(headerConfig:String) {
    let header: HttpHeaders = new HttpHeaders();

    if(headerConfig == 'read' || headerConfig == 'update'){
      header = header.append('Content-type', 'application/json');
      let token:string = sessionStorage.getItem('jwt');
      header = header.append('Authorization', token);
    }else if(headerConfig == 'save'){
      header.append('Content-type', 'application/json');
    }else if(headerConfig == 'signIn'){
      header.append('Content-type', 'application/x-www-form-urlencoded');
    }else if(headerConfig == 'delete'){
      header = header.append('Content-type', 'text/plain');
      let token:string = sessionStorage.getItem('jwt');
      header = header.append('Authorization', token);
    }
    return header;
  }

  readEntity(): Observable<Response> {
    return this.http.get(this.userUrl, { headers: this.getHeader('read') }).map((resp: Response) => resp);
  }
  saveEntity(entity: User): Observable<Response> {
    return this.http.put(this.userUrl, entity, { headers: this.getHeader('save') }).map((resp:Response) => resp);
  }
  updateEntity(entity: User): Observable<Response> {
    return this.http.post(this.userUrl, entity, { headers: this.getHeader('update') }).map((resp:Response) => resp);
  }
  deleteEntity(userId: number): Observable<Response> {
    return this.http.delete(this.userUrl+'/'+userId, { headers: this.getHeader('delete') }).map((resp:Response) => resp);
  }
  
  signIn(email: string, pass: string): Observable<Response> {
    let params:HttpParams = new HttpParams();
    params = params.append('email', email);
    params = params.append('pass', pass);
    return this.http.post(this.userUrl + '/signIn', params, {headers: this.getHeader('signIn'), params }).map((resp:Response) => resp);
  }

}
