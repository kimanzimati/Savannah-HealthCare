import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { of, Observable } from 'rxjs'
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  base_url: string = 'http://localhost:4444'
  token: string = localStorage.getItem('auth_token') ? localStorage.getItem('auth_token') : ''
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.token
    })
  }

  constructor(private http: HttpClient) { }

  //register admin
  register(admin): Observable<any> {
    let post_data = {
      password: admin.password,
      password_confirmation: admin.password_confirmation,
      email: admin.email,
      phone:admin.phone,
      full_name: admin.fullname
    }
    return this.http.post(`${this.base_url}/admin`, post_data, this.httpOptions)
  }
  //admin login
  log_in(admin): Observable<any> {
    let post_data = {
      username: admin.username,
      email: admin.email,
      password: admin.password
    }
    return this.http.post(`${this.base_url}/admin/login`, post_data, this.httpOptions)
      .pipe(
        catchError((error) => {
          console.log('Error--', error)
          return of({})
        })
      )
  }
  //logout admin
  log_out() {
    localStorage.removeItem('access_token')
    return this.http.post('${this.base_url}/admin/logout', {}, this.httpOptions)
  }
}
