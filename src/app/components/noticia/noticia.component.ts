import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  //Se hace un import del indice y de la noticia
  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser, 
              private actionSheetContrl: ActionSheetController, 
              private socialSharing: SocialSharing,
              private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorarBtn;

    if(this.enFavoritos){
      //Borrar de favoritos
      guardarBorarBtn = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Borrar de favorito');
          this.datalocalService.BorrarNoticia(this.noticia);
        }
      };

    }else{

      guardarBorarBtn = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Favorite clicked');
          this.datalocalService.guardarNoticia(this.noticia);
        }
      };
    }


    const actionSheet = await this.actionSheetContrl.create({
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          );
        }
      },
      guardarBorarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        cssClass: 'action-dark',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

  }

}
