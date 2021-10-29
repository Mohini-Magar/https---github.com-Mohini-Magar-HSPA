import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authService : AuthService, private alertifyService : AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(lForm: NgForm){
      const token =this.authService.authUser(lForm.value);
      if(token){
        localStorage.setItem('token',token.userName)
        this.alertifyService.success("Login Suceessful")
        this.router.navigate(['/']);
      }else{
        this.alertifyService.error("Invalid Username and Password")
      }
      lForm.reset();
  }

}
