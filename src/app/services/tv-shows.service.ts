import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GenreDto } from '../models/genre';
import { TvShow, TvShowCredits, TvShowDto, TvShowImages, TvShowVideoDto } from '../models/tvShow';

@Injectable({
  providedIn: 'root'
})
export class TvShowsService {
  baseUrl: string = environment.apiBaseUrl;
  authorizationUrl: string = 'api_key=' + environment.apiKey;

  constructor(private http: HttpClient) {}

  getTvShows(category: string, count: number = 12) {
    return this.http
      .get<TvShowDto>(this.baseUrl + 'tv/' + category + '?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }

  getTvShowsGenres() {
    return this.http
      .get<GenreDto>(this.baseUrl + 'genre/tv/list?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.genres)));
  }

  getTvShowVideos(id: string) {
    return this.http
      .get<TvShowVideoDto>(this.baseUrl + 'tv/' + id + '/videos?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results)));
  }

  searchTvShowsPage(page: number, searchValue?: string) {
    const uri = searchValue ? 'search/tv' : 'tv/top_rated';

    return this.http.get<TvShowDto>(
      this.baseUrl + uri + '?page=' + page + '&query=' + searchValue + '&' + this.authorizationUrl
    );
  }

  getTvShowsPageByGenre(genreId: string, page: number) {
    return this.http
      .get<TvShowDto>(
        this.baseUrl + 'discover/tv?page=' + page + '&with_genres=' + genreId + '&' + this.authorizationUrl
      )
      .pipe(switchMap((response) => of(response.results)));
  }

  getTvShowDetails(id: string) {
    return this.http.get<TvShow>(this.baseUrl + 'tv/' + id + '?' + this.authorizationUrl);
  }

  getTvShowImages(id: string) {
    return this.http.get<TvShowImages>(this.baseUrl + 'tv/' + id + '/images' + '?' + this.authorizationUrl);
  }

  getTvShowCredits(id: string) {
    return this.http.get<TvShowCredits>(this.baseUrl + 'tv/' + id + '/credits' + '?' + this.authorizationUrl);
  }

  getSimilarTvShows(id: string, count: number) {
    return this.http
      .get<TvShowDto>(this.baseUrl + 'tv/' + id + '/similar' + '?' + this.authorizationUrl)
      .pipe(switchMap((response) => of(response.results.slice(0, count))));
  }
}
