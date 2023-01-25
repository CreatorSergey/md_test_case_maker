import {Component, OnInit} from '@angular/core'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  interpolation: ['{{', '}}']
})
export class CardComponent implements OnInit {
  title: string = "My Card Title"
  text: string = "My Sample Text"
  number = 42
  array = [1, 1, 2, 3, 5, 8, 13]
  obj = {name: "Vladilen", info: {age:25}}

  disabled = false

  getInfo(): string {
    return "This is my info"
  }

  ngOnInit() {
    console.log("ngOnInit")
    setTimeout(()=> {
        this.imageUrl = "https://cdn.iconscout.com/icon/free/png-256/vuejs-1175052.png"
        this.disabled = true
    }, 5000)
  }

  imageUrl: string = 'https://angular.io/assets/images/logos/angular/angular.png'
}