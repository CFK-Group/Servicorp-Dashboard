import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../providers/api.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-listado-de-usuarios',
  templateUrl: './listado-de-usuarios.component.html',
  styleUrls: ['./listado-de-usuarios.component.css']
})
export class ListadoDeUsuariosComponent implements OnInit {

  users = []
  filterForm: FormGroup
  filter = {
    fechaInicio: '',
    fechaFin: '',
    nombre: ''
  }

  constructor(private api: ApiService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getFormsQuantity()
    this.filterForm = this.createFilterForm()
  }

  setFilters(){
    this.filter = {
      fechaInicio: this.filterForm.value.fechaInicio,
      fechaFin: this.filterForm.value.fechaFin,
      nombre: this.filterForm.value.nombre
    }
  }

  private createFilterForm(){
    return this.formBuilder.group({
      fechaInicio: [''],
      fechaFin: [''],
      nombre: ['']
    })
  }

  getFormsQuantity(){
    let ids = []
    let cantidades = []
    let nombres = []
    this.api.getUsers()
    .then((res:any) => {
      for(let i=0; i<res.length; i++){
        ids.push(res[i].id)
        nombres.push(res[i].nombre)
      }
      for(let i=0; i<ids.length; i++){
        this.api.getTotalFormsByUserId(ids[i])
        .then((res:any) => {
          cantidades = res.data
          this.users.push({nombre: nombres[i], cantidad: cantidades})
          console.log(this.users)
        })
        .catch(err => {
          console.log('Error:', err)
        })
      }
    })
    .catch((err) => {
      console.log('Error:', err)
    })
  }
}
