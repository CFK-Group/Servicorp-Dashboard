import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../providers/api.service"
import * as moment from 'moment'
import saveAs from 'file-saver'

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
  }

  private createReportesForm(){
    return this.formBuilder.group({
      fechaInicio: moment(),
      fechaFin: moment(),
      empresa: '',
      categoria: ''
    })
  }
  getReporte(){
    let reporteName = 'reporte'
    console.log('Reportes solicitados:', {empresa: this.reportes.value.empresa, tipoFormulario: this.reportes.value.categoria})
    for(let i=0; i<this.reportes.value.categoria.length; i++){
      console.log(this.reportes.value.categoria[i])
      this.api.getReporte(this.reportes.value.categoria[i], this.reportes.value.empresa, this.reportes.value.fechaInicio.format('DD-MM-YYYY'), this.reportes.value.fechaFin.format('DD-MM-YYYY'))
      .subscribe(
        data => saveAs(data, `${reporteName + '-' + this.reportes.value.categoria[i]}-${this.reportes.value.empresa}`),
        error => console.log(error.message)
      )
    }
  }
 
  private guardarReporte(res) {
    const contentDispositionHeader: string = res.headers.get('Content-Disposition')
    const parts: string[] = contentDispositionHeader.split('')
    const filename = parts[1].split('=')[1]
    const blob = new Blob([res._body], { type: 'text/plain' })
    saveAs(blob, filename)
  }
}
