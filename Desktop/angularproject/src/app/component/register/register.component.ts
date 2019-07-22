import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  fname: string = ''
  lname:string = ''
  uname:string = ''
  email: string = ''
  password: string = ''
  phone: string = ''

  constructor(private router: Router, private adminService: AdminService) { }
//navigate back to login
  backToLogin() {
    this.router.navigate(['']);
  }
  //register admin
  register(){
    this.adminService.register({ fname: this.fname, lname: this.lname, uname: this.uname, email: this.email, password: this.password, phone: this.phone })
    .subscribe((res) => {

      if( res.saved ) {
        //redirect to product page after successful login
        this.adminService.log_in({uname: this.uname, email: this.email, password: this.password})
        .subscribe((resp) => {
          if ( resp['token'] && resp['admin']['id'] ) {
            localStorage.setItem('access_token', resp['token'])
            this.router.navigate[''];
          }
        })
      }
      else {
        this.router.navigate[''];
        alert("Wrong password");
      }
    })
  }

  ngOnInit() {
  }

}
