import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from '../../environments/environment';

//Reutilizacion de código
const apiKey  = environment.apiKey;
const apiUrl  = environment.apiUrl;

//Mandar URL por Headers 
const headers = new HttpHeaders({
  //Revisar documentación de la API
  'X-Api-Key': apiKey
});

@Injectable({
  providedIn: 'root'
})

export class NoticiasService {

  //Contador de paginas para Infinite Scroll
  headlinesPage = 0;

  //Se necesita regersar a la página 1 de cada categoria
  categoriaActual = '';
  categoriaPage = 0;

  //Se inyecta el HttpClient
  constructor( private http: HttpClient) { }

  //Funcion para reutilizar, como argumento se coloca el query o endpoint 
  private ejecutarQuery<T>(query: string){

    query = apiUrl + query;

    console.log(query);
    return this.http.get<T>(query, { headers } );

  }
  

  //Obtener Top Head Lines 
  getTopHeadLines() {

    this.headlinesPage++;
    //retorna un observable
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&page=${ this.headlinesPage }`); //Se le pasa el numero de la página
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }

  //Categoria 
  getTopHeadLinesCategoria( categoria: string ) {
    //Validar si la categoria actual es igual a la que se esta recibiendo como argumento
    if(this.categoriaActual === categoria){
        this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }

    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }&page=${ this.categoriaPage }`); //Uso de template string ${categoria}
    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }
}
