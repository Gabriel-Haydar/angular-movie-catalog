import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: string | null = null;

  constructor(private moviesService: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genreId }) => {
      this.genreId = genreId;

      if (genreId) {
        this.getMoviesPageByGenre(genreId, 1);
      } else {
        this.getMoviesPage(1);
      }
    });
  }

  getMoviesPage(page: number) {
    this.moviesService.getMoviesPage(page).subscribe((response) => {
      this.movies = response;
    });
  }

  getMoviesPageByGenre(genreId: string, page: number) {
    this.moviesService.getMoviesPageByGenre(genreId, page).subscribe((response) => {
      this.movies = response;
    });
  }

  paginate(event: any) {
    const page = event.page + 1;
    if (this.genreId) {
      this.getMoviesPageByGenre(this.genreId, page);
    } else {
      this.getMoviesPage(page);
    }
  }
}
