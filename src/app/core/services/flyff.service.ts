import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlyffService {

  constructor(
    private http: HttpClient
  ) { }

  ranking(): Observable<any> {
    //return this.http.get(`${environment.corsHeroku}/${environment.flyffUrl}/ranking`, {responseType: 'text'});
    return this.http.get(`${environment.myHeroku}/get-hml-page?url=https://flyff.gpotato.com.br/ranking`);
    //return this.http.get("http://localhost:8000/get-hml-page?url=https://flyff.gpotato.com.br/ranking");
  }
}
