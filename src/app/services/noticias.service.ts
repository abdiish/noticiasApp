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
    //retorna un observable
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx`);
    //return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }

  //Categoria 
  getTopHeadLinesCategoria( categoria: string ) {
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=mx&category=${ categoria }`); //Uso de template string ${categoria}
    //return this.http.get(`https://newsapi.org/v2/top-headlines?country=de&category=business&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }
}
