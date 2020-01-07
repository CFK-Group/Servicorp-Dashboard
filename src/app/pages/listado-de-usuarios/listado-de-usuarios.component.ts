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

  users = {
    claro: [],
    entel: []
  }
  filterForm: FormGroup
  filter = {
    fechaInicio: moment().subtract(7, 'days').format('DD/MM/YYYY'),
    fechaFin: moment().format('DD/MM/YYYY'),
    nombre: ''
  }
  mesAtras = moment().subtract(1, 'months').format('DD/MM/YYYY')

  constructor(private api: ApiService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getFormsQuantity()
    this.filterForm = this.createFilterForm()
  }

  setFilters(){
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
          if (empresas[i] == 'Claro'){
            this.users.claro.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
          }else if (empresas[i] == 'Entel'){
            this.users.entel.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
          }
        })
        .catch(err => {
          console.log('Error:', err)
        })
      }
      console.log('usuarios de claro:', this.users.claro)
      console.log('usuarios de entel:', this.users.entel)
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
    this.users = {
      claro: [],
      entel: []
    }
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
          if (empresas[i] == 'Claro'){
            this.users.claro.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
          }else if (empresas[i] == 'Entel'){
            this.users.entel.push({nombre: nombres[i], empresa: empresas[i], cantidad: cantidades})
          }
        })
        .catch(err => {
          console.log('Error:', err)
        })
      }
      console.log('usuarios de claro:', this.users.claro)
      console.log('usuarios de entel:', this.users.entel)
    })
    .catch((err) => {
      console.log('Error:', err)
    })
  }
}
