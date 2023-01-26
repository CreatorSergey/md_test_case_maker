import {Component, OnInit, Input} from '@angular/core'
import { Card } from '../app.component'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  interpolation: ['{{', '}}']
})
export class CardComponent implements OnInit {

  @Input() card!: Card
  @Input() index!: number

  cardDate: Date = new Date()

  number = 42
  array = [1, 1, 2, 3, 5, 8, 13]
  obj = {name: "Vladilen", info: {age:25}}

  textColor: string = ""

  disabled = false

  getInfo(): string {
    return "This is my info"
  }

  changeTitle() {
    this.card.title = "hahaha";
  }

  inputHandler(event: any) {
    console.log(event);
    this.card.title = event.target.value;
  }

  inputHandler2(value: string) {
    console.log(value);
    this.card.title = value;
  }

  changeHandler() {
    console.log("changeHandler: " + this.card.title)
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