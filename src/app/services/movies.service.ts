import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = environment.apiMovieBaseUrl;
  authorizationUrl: string = 'api_key=' + environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovies(category: string, count: number = 12) {
    return this.http
      .get<MovieDto>(this.baseUrl + category + '?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(this.baseUrl + id + '/videos?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results)));
  }

  searchMovies(page: number) {
    return this.http
      .get<MovieDto>(this.baseUrl + 'top_rated' + '?page=' + page + '&' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results)));
  }

  getMovieDetails(id: string) {
    return this.http.get<Movie>(this.baseUrl + id + '?' + this.authorizationUrl);
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(this.baseUrl + id + '/images' + '?' + this.authorizationUrl);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(this.baseUrl + id + '/credits' + '?' + this.authorizationUrl);
  }
}
