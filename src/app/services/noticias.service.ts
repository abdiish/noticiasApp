import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  //Se inyecta el HttpClient
  constructor( private http: HttpClient) { }

  //Obtener Top Head Lines 
  getTopHeadLines() {
    return this.http.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=50be7885985b4ba38ccebf9fd4d83731`);
  }

}
