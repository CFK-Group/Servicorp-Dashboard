import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode: string = 'develop'  // cambiar entre develop y producion según sea el caso
  loginForm: FormGroup

  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder) {
    this.loginForm = this.createLoginForm()
  }

  ngOnInit() {
  }

  private createLoginForm(){
    if(this.mode === 'develop'){
      return this.formBuilder.group({
        username: ['test', Validators.required],
        password: ['test', Validators.required]
      })
    }else{
      return this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  }

  login(){
    this.router.navigate(['/dashboard'])
  }

}
