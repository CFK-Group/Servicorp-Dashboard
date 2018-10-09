import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from "../../providers/api.service"
import { toast } from 'angular2-materialize'
import { NgxSpinnerService} from 'ngx-spinner'

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  createUserForm: FormGroup

  constructor(public spinner: NgxSpinnerService, public formBuilder: FormBuilder, private api: ApiService) { 
    this.createUserForm = this.createCreateUserForm()
  }

  ngOnInit() {
    
  }

  private createCreateUserForm(){
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      empresa: ['', Validators.required]
    })
  }

  crearUsuario(){
    this.spinner.show()
    this.api.createUser(this.createUserForm.value)
    .then((res: any) => {
      this.spinner.hide()
      toast('Usuario creado',3000)
    })
    .catch(err => {
      this.spinner.hide()
      toast('No se ha podido crear usuario',3000)
    })
  }

  error(){
    toast('Campos inválidos', 3000)
  }
}
