import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../providers/api.service"

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  reportes: FormGroup
  categorias
  
  constructor(public formBuilder: FormBuilder, private api: ApiService) { }
  
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
  getReporte(){
    console.log('Reportes solicitados:', {empresa: this.reportes.value.empresa, tipoFormulario: this.reportes.value.categoria})
    for(let i=0; i<this.reportes.value.categoria.length; i++){
      console.log(this.reportes.value.categoria[i])
      this.api.getReporte(this.reportes.value.categoria[i], this.reportes.value.empresa, this.reportes.value.fechaInicio, this.reportes.value.fechaFin)
      .then((res:any) => {

      })
      .catch(err => {
        console.log('Error:',`error al pedir reporte de ${this.reportes.value.categoria[i]} de ${this.reportes.value.empresa}.`)
        console.log(err.message)
      })
    }
  }
}
