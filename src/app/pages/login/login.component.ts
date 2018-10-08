import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ApiService } from "../../providers/api.service"
import { User } from '../../../app/user'
import { environment } from '../../../environments/environment'
import { toast } from 'angular2-materialize'
import * as moment from 'moment'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode: string = 'producion'  // cambiar entre develop y producion según sea el caso
  loginForm: FormGroup
  loading = false

  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private api: ApiService) {
    this.loginForm = this.createLoginForm()
    if(localStorage.getItem('userToken') && localStorage.getItem('lastLogin') == moment().format('DD-MM-YYYY')){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() { }

  private createLoginForm(){
    if(this.mode === 'develop'){
      return this.formBuilder.group({
        username: [environment.username, Validators.required],
        password: [environment.password, Validators.required]
      })
    }else{
      return this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      })
    }
  }

  login(){
    console.time('login')
    this.loading = true
    const user =  new User(this.loginForm.value.username, this.loginForm.value.password)
    console.table(user)
    this.api.login(user)
    .then((res: any) => {
      console.timeEnd('login')
      this.loading = false
      console.table(res)
      if(res.success === true){
        localStorage.setItem('userToken', res.token)
        localStorage.setItem('userId', res.id_usuario)
        localStorage.setItem('username', this.loginForm.value.username)
        localStorage.setItem('userType', res.typeUser)
        localStorage.setItem('lastLogin', moment().format('DD-MM-YYYY'))
        this.router.navigate(['/dashboard'])
        toast('Sesión Iniciada',3000)
      }else{
        toast('Usuario o contraseña incorrectos',3000)
      }
    })
    .catch( (reason) => {
      console.timeEnd('login')
      toast('Error al iniciar sesión',3000)
    })
  }

}
