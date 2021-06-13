import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { NoticiasService } from '../../services/noticias.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  //Se crea objeto 'noticias'
  noticias: Article[] = [];

  constructor(private noticiasServices: NoticiasService) {}

  ngOnInit() {
    this.noticiasServices.getTopHeadLines().subscribe(resp => {
      console.log('noticias', resp);
      //Adicionar nuevas noticias al arreglo, como articulos independientes
      this.noticias.push(...resp.articles);
    });
  }

}
