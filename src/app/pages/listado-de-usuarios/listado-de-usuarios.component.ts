import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../providers/api.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import * as moment from 'moment'

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
    console.log('fechaInicio', moment(this.filter.fechaInicio).format('YYYY-MM-DD'))
    console.log('fechaFin', moment(this.filter.fechaFin).format('YYYY-MM-DD'))
    console.log('*********************************')
    console.log(this.filterForm.value.fechaInicio)
    console.log(this.filterForm.value.fechaFin)
    if(this.filterForm.value.fechaInicio != '' && this.filterForm.value.fechaFin != ''){
      this.filter = {
        fechaInicio: moment(this.filterForm.value.fechaInicio).format('YYYY-MM-DD'),
        fechaFin: moment(this.filterForm.value.fechaFin).format('YYYY-MM-DD'),
        nombre: this.filterForm.value.nombre
      }
      this.getFormsQuantityBetweenDate(this.filter.fechaInicio, this.filter.fechaFin)
    }else {
      this.filter = {
        fechaInicio: '',
        fechaFin: '',
        nombre: this.filterForm.value.nombre
      }
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
    let empresas = []
    this.api.getUsers()
    .then((res:any) => {
      for(let i=0; i<res.length; i++){
        ids.push(res[i].id)
        nombres.push(res[i].nombre)
        empresas.push(res[i].empresa)
      }
      for(let i=0; i<ids.length; i++){
        this.api.getTotalFormsByUserId(ids[i])
        .then((res:any) => {
          cantidades = res.data
          this.users.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
        })
        .catch(err => {
          console.log('Error:', err)
        })
      }
      console.log('users: ',this.users)
    })
    .catch((err) => {
      console.log('Error:', err)
    })
  }

  getFormsQuantityBetweenDate(fechaInicio: string, fechaFin: string){
    let ids = []
    let cantidades = []
    let nombres = []
    let empresas = []
    this.users = []
    this.api.getUsers()
    .then((res:any) => {
      for(let i=0; i<res.length; i++){
        ids.push(res[i].id)
        nombres.push(res[i].nombre)
        empresas.push(res[i].empresa)
      }
      for(let i=0; i<ids.length; i++){
        this.api.getTotalFormsByUserIdBetweenDate(ids[i], fechaInicio, fechaFin)
        .then((res:any) => {
          cantidades = res.data
          this.users.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
        })
        .catch(err => {
          console.log('Error:', err)
        })
        console.log('users: ',this.users)
      }
    })
    .catch((err) => {
      console.log('Error:', err)
    })
  }
}
