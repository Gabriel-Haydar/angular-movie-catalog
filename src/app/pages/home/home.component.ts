import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { Item } from 'src/app/models/item';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { MapTvShow2Item } from 'src/app/models/tvShow';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  upcomingMovies: Item[] = [];
  popularMovies: Item[] = [];
  topRatedMovies: Item[] = [];
  popularTVShows: Item[] = [];
  topRatedTVShows: Item[] = [];

  constructor(private moviesService: MoviesService, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.moviesService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response;
    });
    this.moviesService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response;
    });
    this.moviesService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response;
    });
    this.tvShowsService.getTvShows('popular').subscribe((response) => {
      this.popularTVShows = response.map((tvShow) => MapTvShow2Item(tvShow));
    });
    this.tvShowsService.getTvShows('top_rated').subscribe((response) => {
      this.topRatedTVShows = response.map((tvShow) => MapTvShow2Item(tvShow));
    });
  }
}
