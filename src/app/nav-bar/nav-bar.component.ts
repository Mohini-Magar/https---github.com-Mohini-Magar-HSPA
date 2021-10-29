import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loggedinUser: string;
  constructor() { }

  ngOnInit() {
  }
  loggedIn(){
    this.loggedinUser = localStorage.getItem('token');
    return this.loggedinUser;
  }

  onLogout(){
    localStorage.removeItem('token');
  }
}
