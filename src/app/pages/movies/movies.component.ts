import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMoviePage(1);
  }

  getMoviePage(page: number) {
    this.moviesService.searchMovies(page).subscribe((response) => {
      this.movies = response;
    });
  }

  paginate(event: any) {
    this.getMoviePage(event.page + 1);
    console.log(event);
  }
}
