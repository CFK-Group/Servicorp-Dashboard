import { Component, OnInit } from '@angular/core'
import { ApiService } from "../../providers/api.service"

@Component({
  selector: 'app-imagenes',
  templateUrl: './imagenes.component.html',
  styleUrls: ['./imagenes.component.css']
})
export class ImagenesComponent implements OnInit {

  files = []

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getFiles()
  }

  getFiles() {
    this.api.getZips()
      .then((res: any) => {
        this.files = res.data.sort((a, b) => b.id - a.id)
      })
      .catch(err => {
        console.error('Error: ' + err.message)
      })
  }

}
