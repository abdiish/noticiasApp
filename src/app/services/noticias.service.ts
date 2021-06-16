import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  //Se inyecta el HttpClient
  constructor( private http: HttpClient) { }

  //Obtener Top Head Lines 
  getTopHeadLines() {
    
    return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/top-headlines?country=mx&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }

}
