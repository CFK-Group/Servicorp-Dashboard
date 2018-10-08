import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { User } from "../../app/user"
import "rxjs/Rx"
import { Observable } from "rxjs"
import { environment } from "../../environments/environment"

/*
  Generated class for the Api service.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiService {
  
  constructor(public api: HttpClient) { }
  
  url = environment.apiUrl

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
    return this.api.get(`${this.url}/reporte/${tipoFormulario}/${empresa}/${fechaInicio}/${fechaFin}/${localStorage.getItem('userToken')}`, {responseType: 'blob', headers: new HttpHeaders().append('Content-Type', 'application/json') })
  }

  createUser(data){
    return this.api.post(`${this.url}/new/user/${localStorage.getItem('userToken')}`, data).toPromise()
  }
}
