import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  empresa
  categorias
  
  constructor() { }
  
  ngOnInit() {
    if(this.empresa == 'Claro'){
      this.categorias = ['Instalación HFC', 'Instalación DTH', 'Mantención HFC', 'Mantención DTH', 'Desconexión']
    }else if(this.empresa == 'Entel'){
      this.categorias = ['Desconexión']
    }
    console.log(this.empresa)
  }

}
