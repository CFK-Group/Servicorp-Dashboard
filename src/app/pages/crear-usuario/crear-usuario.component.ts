import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ApiService } from "../../providers/api.service"

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  createUserForm: FormGroup

  constructor(public formBuilder: FormBuilder, private api: ApiService) { 
    this.createUserForm = this.createCreateUserForm()
  }

  ngOnInit() {
    
  }

  private createCreateUserForm(){
    return this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      username: ['', Validators.required],
      contraseña: ['', Validators.required],
      tipo_usuario: ['', Validators.required],
      empresa: ['', Validators.required]
    })

  }

}
