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

  getFiles(){
    this.api.getZips()
    .then((res: any) => {
      console.log(res.data)
      this.files = res.data
    })
    .catch(err => {
      console.error('Error: ' + err.message)
    })
  }

}
