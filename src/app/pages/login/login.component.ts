import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'
import { ApiService } from "../../providers/api.service"
import { User } from '../../../app/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mode: string = 'develop'  // cambiar entre develop y producion según sea el caso
  loginForm: FormGroup
  loading = false

  constructor(private route: ActivatedRoute, private router: Router, public formBuilder: FormBuilder, private api: ApiService) {
    this.loginForm = this.createLoginForm()
    if(localStorage.getItem('userToken')){
      this.router.navigate(['/dashboard'])
    }
  }

  ngOnInit() { }

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
        this.router.navigate(['/dashboard'])
      }else{
        // let alert = this.alertCtrl.create({
        //   title: 'Error al iniciar sesión',
        //   subTitle: 'nombre de usuario o contraseña incorrectos',
        //   buttons: ['OK']
        // })
        // alert.present()
      }
    })
    .catch( (reason) => {
      console.timeEnd('login')
      this.loading = false
      // let alert = this.alertCtrl.create({
      //   title: 'Error al iniciar sesión.',
      //   subTitle: 'Por favor revise su conexión a internet.',
      //   buttons: ['OK']
      // })
      // alert.present()
    })
  }

}
