import { Component, OnInit } from '@angular/core';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { Genre } from '../../models/genre';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {
  movieGenres: Genre[] = [];
  tvShowGenres: Genre[] = [];

  constructor(private moviesService: MoviesService, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.getMovieGenres();
    this.getTvShowGenres();
  }

  getMovieGenres() {
    this.moviesService.getMoviesGenres().subscribe((response) => (this.movieGenres = response));
  }
  getTvShowGenres() {
    this.tvShowsService.getTvShowsGenres().subscribe((response) => (this.tvShowGenres = response));
  }
}
