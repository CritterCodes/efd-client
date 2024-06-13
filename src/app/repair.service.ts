import { Injectable } from '@angular/core';
import { Repair } from './repair';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private repairsUrl = '/api/v1/repairs';

  constructor(
    private http: HttpClient,
    ) { }

  getRepairs = (): Observable<Repair[]> => {
    return this.http.get<Repair[]>(this.repairsUrl);
  }

  getRepair = (repairID: string): Observable<Repair> => {
    return this.http.get<Repair>(`${this.repairsUrl}/${repairID}`);
  }

  deleteRepair = (repairID: string): Observable<Object> => {
    return this.http.delete(`${this.repairsUrl}/${repairID}`);
  }

  updateRepair = (repairID: string, repair: Repair): Observable<Repair> => {
    return this.http.patch<Repair>(`${this.repairsUrl}/${repairID}`, repair);
  }

  createRepair = (repair: Repair): Observable<Repair> => {
    return this.http.post<Repair>(`${this.repairsUrl}`, repair)
  }
}