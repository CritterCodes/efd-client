import { Injectable } from '@angular/core';
import { Collector } from './collector';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {
  private collectorsUrl = '/api/v1/collectors';

  constructor(
    private http: HttpClient,
    ) { }

  getCollectors = (): Observable<Collector[]> => {
    return this.http.get<Collector[]>(this.collectorsUrl);
  }

  getCollector = (identifier: string): Observable<Collector> => {
    return this.http.get<Collector>(`${this.collectorsUrl}/${identifier}`);
  }

  deleteCollector = (collectorID: string): Observable<Object> => {
    return this.http.delete(`${this.collectorsUrl}/${collectorID}`);
  }

  updateCollector = (collectorID: string, collector: Collector): Observable<Collector> => {
    return this.http.patch<Collector>(`${this.collectorsUrl}/${collectorID}`, collector);
  }

  createCollector = (collector: Collector): Observable<Collector> => {
    return this.http.post<Collector>(`${this.collectorsUrl}`, collector)
  }
}
