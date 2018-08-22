import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  reportes: FormGroup
  categorias
  
  constructor(public formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.reportes = this.createReportesForm()
    if(this.reportes.value.empresa == 'Claro'){
      this.reportes.value.categorias = ['Instalación HFC', 'Instalación DTH', 'Mantención HFC', 'Mantención DTH', 'Desconexión']
    }else if(this.reportes.value.empresa == 'Entel'){
      this.reportes.value.categorias = ['Instalación DTH']
    }
    this.categorias = this.reportes.value.categorias
  }

  private createReportesForm(){
    return this.formBuilder.group({
      fechaInicio: null,
      fechaFin: null,
      empresa: '',
      categoria: ''
    })
  }
  prueba(){
    if(this.reportes.value.empresa == 'Claro'){
      this.reportes.value.categorias = ['Instalación HFC', 'Instalación DTH', 'Mantención HFC', 'Mantención DTH', 'Desconexión']
    }else if(this.reportes.value.empresa == 'Entel'){
      this.reportes.value.categorias = ['Instalación DTH']
    }
    this.categorias = this.reportes.value.categorias
    console.log(this.categorias)
  }
}
