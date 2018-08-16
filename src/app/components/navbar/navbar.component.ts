import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username = localStorage.getItem('username')

  constructor() { }

  ngOnInit() { }

  logout() {
    localStorage.clear()
  }

}
