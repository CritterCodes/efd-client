import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {
  private apiUrl = '/api/v1/reviews'; // Proxy endpoint

  constructor(private http: HttpClient) {}

  getGoogleReviews(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(response => {
        console.log('API response:', response); // Log the entire response
        return response.result ? response.result.reviews : [];
      }),
      catchError(error => {
        console.error('Error fetching reviews:', error);
        return [];
      })
    );
  }
}
