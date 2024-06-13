import { Injectable } from '@angular/core';
import { Collector } from './collector';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {
  private connectsUrl = '/api/v1/connect';

  constructor(
    private http: HttpClient,
    ) { }

  connect = (): Observable<Collector[]> => {
    return this.http.get<Collector[]>(`${this.connectsUrl}/${collectorID}`);
  }

}
