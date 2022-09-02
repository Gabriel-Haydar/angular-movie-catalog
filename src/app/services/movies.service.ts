import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MovieDto } from '../models/movie';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = environment.apiMovieBaseUrl;
  apiKey: string = environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovies(category: string, count: number = 12) {
    return this.http
      .get<MovieDto>(this.baseUrl + category + '?api_key=' + this.apiKey)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }
}
