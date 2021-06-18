import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

 @ViewChild(IonSegment, {static: true}) segment: IonSegment;

  //Arreglo de categorias
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  
  noticias: Article[] = [];

  constructor(private noticiasService: NoticiasService) {


  }

  ngOnInit() {
    
    this.segment.value = this.categorias[0];

   this.noticiasService.getTopHeadLinesCategoria( this.categorias[0] )
      .subscribe(resp => {
          console.log(resp);
          this.noticias.push(...resp.articles)

      });
  }

}
