import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  uname:string = ''
  email: string = ''
  password: string = ''
  constructor(private router: Router, private adminService: AdminService) { }
  
  login(){
    this.adminService.log_in({uname: this.uname, email: this.email, password: this.password})
    .subscribe((res)=>{
      if(res['token'] && res['admin']) {
        localStorage.setItem('users', JSON.stringify(res));
        this.router.navigate[''];
        alert('Successful login');
      }
      else {
        this.router.navigate[''];
        alert('Login failed! Check username, email and password');
      }
    })
  }
  //navigate to registration page
  gotoSignup() {
    this.router.navigate['register'];
  }

  ngOnInit() {
  }

}
