import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService{

 public noticias: Article[] = []; //Arreglo que almacenara las noticias
 private _storage: Storage  | null = null;

  constructor(private storage: Storage) { 
    this.init();
    this.cargarFavoritos();//Se dispara cuando la aplicaciòn necesite el servicio de storage, cuando intenetemos insertar favoritos
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  //Guardar noticia
  guardarNoticia( noticia: Article){

    //Validar si existe la noticia
    const existe = this.noticias.find(noti => noti.title === noticia.title);

    //Si no existe la noticia, se guarda
    if(!existe){

      this.noticias.unshift(noticia);
      this._storage.set('favoritos',this.noticias);

    }
    
  }

  //Cargar lista de favoritos
  async cargarFavoritos(){

    const favoritos = await this.storage.get('favoritos');

    if(favoritos){
      this.noticias = favoritos
    }
     
    //console.log('Async away', favoritos);

    /* this.storage.get('favoritos')
      .then( favoritos => {
        console.log('favoritos', favoritos);
      }); */
  }

  BorrarNoticia(noticia: Article) {
    
    this.noticias = this.noticias.filter(noti => noti.title !== noticia.title);
    this._storage.set('favoritos',this.noticias);

  }

}
