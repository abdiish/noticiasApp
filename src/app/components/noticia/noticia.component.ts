import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  //Se hace un import del indice y de la noticia
  @Input() noticia: Article;
  @Input() indice: number;

  constructor() { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('Noticia', this.noticia.url);
  }

}
