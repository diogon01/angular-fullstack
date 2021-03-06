import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginacaoModel } from './data-model/paginacao.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadesService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  findLessons(filter: string, sortOrder: string,
    pageNumber: number, pageSize: number): Observable<PaginacaoModel> {
    return this.http.get<PaginacaoModel>(this.baseUrl + '/api/atividades', {
      params: new HttpParams()
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', (pageNumber + 1).toString())
        .set('pageSize', pageSize.toString())
    });
  }

}
