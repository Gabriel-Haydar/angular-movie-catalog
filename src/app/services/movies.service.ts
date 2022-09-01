import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  getUpcomingMovies() {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming?api_key=9069cfdd7726fc6f8dca5c4ea9ec5319');
  }
}
