import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideoDto } from '../models/movie';
import { of, switchMap } from 'rxjs';
import { GenreDto } from '../models/genre';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  baseUrl: string = environment.apiMovieBaseUrl;
  authorizationUrl: string = 'api_key=' + environment.apiKey;

  constructor(private http: HttpClient) {}

  getMovies(category: string, count: number = 12) {
    return this.http
      .get<MovieDto>(this.baseUrl + 'movie/' + category + '?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }

  getMoviesGenres() {
    return this.http
      .get<GenreDto>(this.baseUrl + 'genre/movie/list?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.genres)));
  }

  getMovieVideos(id: string) {
    return this.http
      .get<MovieVideoDto>(this.baseUrl + 'movie/' + id + '/videos?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results)));
  }

  searchMoviesPage(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/movie' : 'movie/top_rated';

    return this.http
      .get<MovieDto>(this.baseUrl + uri + '?page=' + page + '&query=' + searchValue + '&' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results)));
  }

  getMoviesPageByGenre(genreId: string, page: number) {
    return this.http
      .get<MovieDto>(
        this.baseUrl + 'discover/movie?page=' + page + '&with_genres=' + genreId + '&' + this.authorizationUrl
      )
      .pipe(switchMap((response) => of(response.results)));
  }

  getMovieDetails(id: string) {
    return this.http.get<Movie>(this.baseUrl + 'movie/' + id + '?' + this.authorizationUrl);
  }

  getMovieImages(id: string) {
    return this.http.get<MovieImages>(this.baseUrl + 'movie/' + id + '/images' + '?' + this.authorizationUrl);
  }

  getMovieCredits(id: string) {
    return this.http.get<MovieCredits>(this.baseUrl + 'movie/' + id + '/credits' + '?' + this.authorizationUrl);
  }

  getSimilarMovies(id: string, count: number) {
    return this.http
      .get<MovieDto>(this.baseUrl + 'movie/' + id + '/similar' + '?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }
}
