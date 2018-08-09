import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  FormsPerType:any;
  FormsPerDay:any;

  constructor() { }

  ngOnInit() {
    Chart.defaults.global.defaultFontColor = 'white';
    this.FormsPerDay = new Chart('formsPerDay', {
      type: 'line', // tipo de gráfico (line, bar, radar...)
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [{
          label: 'Items por Día',
          data: [12,19,3,5,2,3,12,19,3,5,2,3,9,10,11,12,13,14,15,16,17, 19, 3, 5, 2,3,20,19,3,5,2],
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
    });
    this.FormsPerType = new Chart('formsPerType', {
      type: 'line',
      data: {
        labels: [1,2,3,4,5,6,7],
        datasets: [
          {
            label: 'Instalación HFC',
            data: [12,8,3,5,7,10,20],
            backgroundColor: [ // color interior de las barras
                'rgba(255,255,255, 0.2)'
            ],
            borderColor: [ // color del borde de las barras
                'rgba(255,152,0,1)'
            ],
            borderWidth: 2
          },
          {
            label: 'Instalación DTH',
            data: [2,19,16,18,15,7,16],
            backgroundColor: [ // color interior de las barras
              'rgba(255,255,255, 0.2)'
            ],
            borderColor: [ // color del borde de las barras
                'rgba(238,255,65,1)'
            ],
            borderWidth: 2
          },
          {
            label: 'Mantención HFC',
            data: [12,19,20,8,10,18,5],
            backgroundColor: [ // color interior de las barras
              'rgba(255,255,255, 0.2)'
            ],
            borderColor: [ // color del borde de las barras
                'rgba(245,0,87,1)'
            ],
            borderWidth: 2
          },
          {
            label: 'Matención DTH',
            data: [12,15,5,14,2,12,13],
            backgroundColor: [ // color interior de las barras
              'rgba(255,255,255, 0.2)'
            ],
            borderColor: [ // color del borde de las barras
                'rgba(98,0,234,1)'
            ],
            borderWidth: 2
          },
          {
            label: 'Desconexión',
            data: [12,4,10,10,20,3,11],
            backgroundColor: [ // color interior de las barras
              'rgba(255,255,255, 0.2)'
            ],
            borderColor: [ // color del borde de las barras
                'rgba(0,230,118,1)'
            ],
            borderWidth: 2
          },
        ]
      },
      options: {
        title: {
          text: 'Items creados por categoría durante los últimos 7 días',
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
    });
  }
}
