import { Component, OnInit } from '@angular/core'
import * as Chart from 'chart.js'
import { ApiService } from "../../providers/api.service"

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  entel:any
  claro:any
  usuarios:any

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getUsers()
    .then((res:any) => {
      this.usuarios = res
    })
    .catch((err) => {
      console.error('Error: ' + err.message)
    })
    Chart.defaults.global.defaultFontColor = 'white'
    this.claro = new Chart('claro', {
      type: 'line', // tipo de gráfico (line, bar, radar...)
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [{
          label: 'Items por Día',
          data: [12,19,3,5,2,3,12,19,3,5,2,3,9,10,11,12,13,14,15,16,17, 19, 3, 5, 2,3,18,19,3,5,2,12,19,3,5,2,3,12,19,3,5,2,3,9,10,11,12,13,14,15,16,17, 19, 3, 5, 2,3,18,19,3,5,2],
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
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [{
          label: 'Items por Día',
          data: [12,19,3,5,2,3,12,19,3,5,2,3,9,10,11,12,13,14,15,16,17, 19, 3, 5, 2,3,18,19,3,5,2],
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
}
