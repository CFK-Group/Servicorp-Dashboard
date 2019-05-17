import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { ApiService } from "../../providers/api.service"
import * as moment from 'moment'
import saveAs from 'file-saver'
import { toast } from 'angular2-materialize'

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  reportes: FormGroup
  categorias
  mesAtras = moment().subtract(1, 'months').format('DD/MM/YYYY')

  constructor(public formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.reportes = this.createReportesForm()
    this.reportes.value.fechaInicio = moment().subtract(1, 'days')
    this.reportes.value.fechaFin = moment()
  }

  private createReportesForm() {
    return this.formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      empresa: ['', Validators.required],
      categoria: ['', Validators.required]
    })
  }
  getReporte() {
    let reporteName = 'reporte'
    console.log('Reportes solicitados:', { empresa: this.reportes.value.empresa, tipoFormulario: this.reportes.value.categoria })
    for (let i = 0; i < this.reportes.value.categoria.length; i++) {
      this.api.getReporte(this.reportes.value.categoria[i], this.reportes.value.empresa, moment(this.reportes.value.fechaInicio).format('YYYY-MM-DD'), moment(this.reportes.value.fechaFin).add(23, 'hours').add(59, 'minutes').format('YYYY-MM-DD HH:mm'))
        .subscribe(
          data => {
            let formName
            if (this.reportes.value.categoria[i] == 1) {
              formName = 'instalaciones-HFC'
            } else if (this.reportes.value.categoria[i] == 2) {
              formName = 'instalaciones-DTH'
            } else if (this.reportes.value.categoria[i] == 3) {
              formName = 'mantenciones-HFC'
            } else if (this.reportes.value.categoria[i] == 4) {
              formName = 'mantenciones-DTH'
            } else if (this.reportes.value.categoria[i] == 5) {
              formName = 'desconexiones'
            } else if (this.reportes.value.categoria[i] == 6) {
              formName = 'instalaciones-DTH'
            } else if (this.reportes.value.categoria[i] == 7) {
              formName = 'BAFI'
            } else if (this.reportes.value.categoria[i] == 8) {
              formName = 'DUO'
            }
            saveAs(data, `${reporteName + '-' + formName}-${this.reportes.value.empresa}`)
            toast('Descargando reporte', 3000)
          },
          error => {
            toast('No hay reportes en la fecha seleccionada', 3000)
          }
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
