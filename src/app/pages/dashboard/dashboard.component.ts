import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  titleFormsPerDay = 'Formularios por Día';
  titlePerType = 'Formularios por tipo';
  FormsPerType:any;
  FormsPerDay:any;

  constructor() { }

  ngOnInit() {
    Chart.defaults.global.defaultFontColor = 'white';
    this.FormsPerDay = new Chart('formsPerDay', {
      type: 'line',
      data: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        datasets: [{
          label: 'Cantidad de Formularios',
          data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5, 2, 3,9,10,11,12,13,14,15,16,17, 19, 3, 5, 2, 3, 20, 19, 3, 5, 2],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: this.titleFormsPerDay,
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
        labels: ['Instalación HFC','Instalación DTH','Mantención HFC','Matención DTH','Desconexión'],
        datasets: [{
          label: 'Cantidad de Formularios',
          data: [12, 19, 3, 5, 2, 3, 20],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: this.titlePerType,
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
