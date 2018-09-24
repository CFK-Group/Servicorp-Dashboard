import { Component, OnInit } from '@angular/core'
import * as Chart from 'chart.js'
import { ApiService } from "../../providers/api.service"
import * as moment from 'moment'

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  entel:any
  claro:any
  usuarios:any
  fechaActual = moment()

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.api.getUsers()
    // .then((res:any) => {
    //   this.usuarios = res
    // })
    // .catch((err) => {
    //   console.error('Error: ' + err.message)
    // })
    Chart.defaults.global.defaultFontColor = 'white'
    let data = {
      claro: this.dias('claro'),
      entel: this.dias('entel')
    }
    this.claro = new Chart('claro', {
      type: 'line', // tipo de gráfico (line, bar, radar...)
      data: {
        labels: data.claro.dias,
        datasets: [{
          label: 'Items por Día',
          data: data.claro.valor,
          backgroundColor: [ // color bajo la curva
              'rgba(255,255,255, 0.2)'
          ],
          borderColor: [ // color de la curva
              'rgba(255,255,255,1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: 'Items creados desde el 1er día del mes anterior hasta hoy',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
    this.entel = new Chart('entel', {
      type: 'line', // tipo de gráfico (line, bar, radar...)
      data: {
        labels: data.entel.dias,
        datasets: [{
          label: 'Items por Día',
          data: data.entel.valor,
          backgroundColor: [ // color bajo la curva
              'rgba(255,255,255, 0.2)'
          ],
          borderColor: [ // color de la curva
              'rgba(255,255,255,1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: 'Items creados desde el 1er día del mes anterior hasta hoy',
          display: true
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })
  }

  cantidadDiasMesAnterior(){
    var fecha = new Date()
	  return new Date(fecha.getFullYear(), fecha.getMonth(), 0).getDate()
  }

  cantidadDiasMesActualHastaHoy(){
    var fecha = new Date()
	  return fecha.getDate()
  }

  dias(empresa:string){
    let dias = {
      valor: [],
      dias: []
    }
    let fechaActual = this.fechaActual
    for(var i=0; i<this.cantidadDiasMesAnterior(); i++){
      dias.dias.push(i)
      this.api.getTotalFormsByDate(empresa, this.primerDiaMesAnterior().add(i, 'days').format('YYYY-MM-DD'),this.primerDiaMesAnterior().add(i + 1, 'days').format('YYYY-MM-DD'))
      .then((res:any) => {
        dias.valor.push(res.data.total)
      })
      .catch((err) => {
        i = this.cantidadDiasMesAnterior()
        console.error('Error: ' + err.message)
      })
    }
    for(var i=0; i<this.cantidadDiasMesActualHastaHoy(); i++){
      dias.dias.push(i)
      this.api.getTotalFormsByDate(empresa, this.primerDiaMesAnterior().add(i, 'days').format('YYYY-MM-DD'),this.primerDiaMesAnterior().add(i + 1, 'days').format('YYYY-MM-DD'))
      .then((res:any) => {
        dias.valor.push(res.data.total)
      })
      .catch((err) => {
        i = this.cantidadDiasMesAnterior()
        console.error('Error: ' + err.message)
      })
    }
    return dias
  }

  diasTotales(){
    return this.cantidadDiasMesAnterior() + this.cantidadDiasMesActualHastaHoy()
  }

  primerDiaMesAnterior(){
    let fecha = moment()
    return fecha.subtract(this.diasTotales() - 1, 'd')
  }
}
