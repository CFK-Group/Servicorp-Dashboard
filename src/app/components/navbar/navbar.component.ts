import { Component, OnInit } from '@angular/core'
import * as moment from 'moment'
import {Router} from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  username

  constructor(private router: Router) { }

  ngOnInit() { 
    this.username = localStorage.getItem('username')
    if(localStorage.getItem('lastLogin') !== moment().format('DD-MM-YYYY')){
      this.logout()
    }
  }

  logout() {
    localStorage.clear()
    this.router.navigate(['login'])
  }

  getUsername(){
    return this.username
  }

  getUserType(){
    return localStorage.getItem('userType')
  }

}
