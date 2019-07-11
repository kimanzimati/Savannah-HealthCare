import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { adminService } from '../services/admin-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string=''
  password: string=''
  username: string=''

  constructor(private router: Router, private adminService: adminService ) { }

  login(){
    this.adminService.log_in({email: this.email, username: this.username, password: this.password})
    .subscribe((res)=>{

      if(res['token'] && res['user']) {
        this.adminService.set_session(res);
        this.router.navigate(['']);
        //alert successful login
      }
      else {
        this.router.navigate(['']);
        alert('Login failed! Check username, email address and/or password')
      }
    })
  }

  goToSignUp() {
    this.router.navigate['register'];
  }

  ngOnInit() {
  }

}
