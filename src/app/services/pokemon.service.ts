import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { concatMap, map, mergeMap } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url: string = environment.apiUrl + 'pokemon/';

  constructor(private http: HttpClient) {
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get<any>(url);
  }

  getNext(url: string): Observable<any> {
    url = url === '' ? `${this.url}?limit=10` : url;
    return this.http.get<any>(url);
  }
}
