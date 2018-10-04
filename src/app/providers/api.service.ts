import { HttpClient } from '@angular/common/http'
import { Headers } from '@angular/http'
import { Injectable } from '@angular/core'
import { User } from "../../app/user"
//import "rxjs/Rx"

/*
  Generated class for the Api service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiService {
  // url: string = "http://genesis.xpass.cl:3001"
  url: string = "http://localhost:3001"

  constructor(public api: HttpClient) { }

  getZips(){
    return this.api.get(`${this.url}/zips-imgs/${localStorage.getItem('userToken')}`).toPromise()
  }

  login(user: User){
    return this.api.post<User>(`${this.url}/login`, user).toPromise()
  }

  getFormularios(data){
    if(data.tipoFormulario !== 'desconexion'){
      return this.api.get(`${this.url}/formulario/${data.tipoFormulario}/${data.subtipoFormulario}/${data.userToken}`).toPromise()
    }else {
      return this.api.get(`${this.url}/formulario/desconexion/${data.userToken}`).toPromise()
    }
  }

  getFormResponses(formularioId){
    return this.api.get(`${this.url}/respuestas/${formularioId}/${localStorage.getItem('userToken')}`).toPromise()
  }

  getFormQuestions(formularioId){
    return this.api.get(`${this.url}/preguntas/${formularioId}/${localStorage.getItem('userToken')}`).toPromise()
  }

  getUsers(){
    return this.api.get(`${this.url}/users`).toPromise()
  }

  getUsersForms(){
    return this.api.get(`${this.url}/users/forms`).toPromise()
  }

  getTotalFormsByDate(empresa:string, data){ // la fecha debe estar en formato yyyy-mm-dd y el rango es de tipo [)
    return this.api.post(`${this.url}/formularios/${empresa}/${localStorage.getItem('userToken')}`, data).toPromise()
  }

  getTotalFormsByUserId(userId){
    return this.api.get(`${this.url}/formularios/${userId}/${localStorage.getItem('userToken')}`).toPromise()
  }

  getReporte(tipoFormulario:string, empresa:string, fechaInicio, fechaFin){
    //const headers = new Headers()
    //headers.append('Content-Type', 'application/vnd.ms-excel')
    // return this.api.get(`${this.url}/reporte/${tipoFormulario}/${empresa}/${fechaInicio}/${fechaFin}/${localStorage.getItem('userToken')}`, { headers: headers }).toPromise()
    return this.api.get(`${this.url}/reporte/${tipoFormulario}/${empresa}/${fechaInicio}/${fechaFin}/${localStorage.getItem('userToken')}`).toPromise()
  }

}
