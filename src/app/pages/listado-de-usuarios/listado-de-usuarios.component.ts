import { Component, OnInit } from '@angular/core'
import { ApiService } from '../../providers/api.service'

@Component({
  selector: 'app-listado-de-usuarios',
  templateUrl: './listado-de-usuarios.component.html',
  styleUrls: ['./listado-de-usuarios.component.css']
})
export class ListadoDeUsuariosComponent implements OnInit {

  users = []

  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getUsersForms(){
    this.api.getUsersForms()
    .then((res:any) => {
      this.users = res
      console.table(this.users)
    })
  }
}
