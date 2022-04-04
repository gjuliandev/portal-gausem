import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements OnInit {

  @Input() titulo: any; 
  @Input() subtitulo: any; 
  @Input() valor: any; 


  constructor() { }

  ngOnInit(): void {
    console.log(this.titulo);
    console.log(this.subtitulo);
    console.log(this.valor);
  }

}
