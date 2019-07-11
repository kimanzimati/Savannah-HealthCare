import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  base_url: string = 'http://localhost:4200'

  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : ''
  httpOptions= {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }
  constructor(private http:HttpClient) { }

  register(admin): Observable<any> {
    let post_data = {
      password: admin.password,
      email: admin.email,
      username: admin.name
    }
    return this.http.post('${this.base_url}/admin', post_data, this.httpOptions)
  }
  log_in(admin): Observable<any> {
    let post_data = {
      email: admin.email,
      username: admin.name,
      password: admin.password
    }
    return this.http.post('${this.base_url}/admin/login', post_data, this.httpOptions)
    .pipe(
      catchError((error) => {
        console.log('Error')
        return of({})
      })
    )
  }
  log_out() {
    localStorage.removeItem('access_token')
    return this.http.post('${this.base_url}/admin/logout', {}, this.httpOptions)
  }

  details(id) {
    return this.http.get('$[this.base_url}/admin/${id}', this.httpOptions)
  }

  get_current_admin() {
    return JSON.parse(localStorage.getItem('current_admin'))
  }
  set_session(admin) {
    localStorage.setItem('access_token', admin['token'])
    localStorage.setItem('current_admin', JSON.stringify(admin.admin))
  }

  
}
