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
  data = {
    claro: {
      dias: [],
      valor: []
    },
    entel: {
      dias: [],
      valor: []
    }
  }
  fechas = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    for(var i=0; i<this.cantidadDiasMesAnterior(); i++){
      this.data.claro.dias.push(this.primerDiaMesAnterior().add(i, 'days').format('DD'))
      this.data.entel.dias.push(this.primerDiaMesAnterior().add(i, 'days').format('DD'))
      this.fechas.push(this.primerDiaMesAnterior().add(i, 'days').format('YYYY-MM-DD'))
    }
    for(var i=0; i<=this.cantidadDiasMesActualHastaHoy(); i++){ // enviamos un dia más del que necesitamos para facilitar los calculos en la api
      this.data.claro.dias.push(this.primerDiaMesActual().add(i, 'days').format('DD'))
      this.data.entel.dias.push(this.primerDiaMesActual().add(i, 'days').format('DD'))
      this.fechas.push(this.primerDiaMesActual().add(i, 'days').format('YYYY-MM-DD'))
    }
    this.totalFormsByDate('claro')
    this.totalFormsByDate('entel')
  }

  cantidadDiasMesAnterior(){
    var fecha = new Date()
	  return new Date(fecha.getFullYear(), fecha.getMonth(), 0).getDate()
  }

  cantidadDiasMesActualHastaHoy(){
    var fecha = new Date()
	  return fecha.getDate()
  }

  totalFormsByDate(empresa:string){
    this.api.getTotalFormsByDate(empresa, this.fechas)
    .then((res:any) => {
      if(empresa == 'claro'){
        // array con valores totales en el mismo orden de las fechas enviadas
        for(let i=0; i<res.data.length; i++){
          this.data.claro.valor.push(res.data[i].cantidad)
        }
      }else if(empresa == 'entel'){
        // array con valores totales en el mismo orden de las fechas enviadas
        for(let i=0; i<res.data.length; i++){
          this.data.entel.valor.push(res.data[i].cantidad)
        }
      }

      // se crean los graficos en este punto para evitar un problema con los valores obtenidos desde el api
      Chart.defaults.global.defaultFontColor = 'white'
      this.claro = new Chart('claro', {
        type: 'line', // tipo de gráfico (line, bar, radar...)
        data: {
          labels: this.data.claro.dias,
          datasets: [{
            label: 'Items por Día',
            data: this.data.claro.valor,
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
          labels: this.data.entel.dias,
          datasets: [{
            label: 'Items por Día',
            data: this.data.entel.valor,
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
    })
    .catch(err => {
      console.log('Error:', err)
    })
    if(empresa == 'claro'){
      this.data.claro.dias.pop()
    }else if(empresa == 'entel'){
      this.data.entel.dias.pop()
    }
  }

  diasTotales(){
    return this.cantidadDiasMesAnterior() + this.cantidadDiasMesActualHastaHoy()
  }

  primerDiaMesAnterior(){
    let fecha = moment()
    return fecha.subtract(this.diasTotales() - 1, 'd')
  }

  primerDiaMesActual(){
    let fecha = moment()
    return fecha.subtract(this.cantidadDiasMesActualHastaHoy() - 1, 'd')
  }
}
