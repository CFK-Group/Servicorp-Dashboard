import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username

  constructor() { }

  ngOnInit() { 
    this.username = localStorage.getItem('username')
  }

  logout() {
    localStorage.clear()
  }

  getUsername(){
    return this.username
  }

}
