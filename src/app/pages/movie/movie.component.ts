import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { IMAGE_SIZES } from 'src/app/constants/images-sizes';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imagesSizes = IMAGE_SIZES;

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie() {
    // Since not HttpClient, need to use pipe(first()) to make sure the subscription does not run forever (only once) even if ngOnDestroy is used.
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovieFromId(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  getMovieFromId(id: string) {
    this.moviesService.getMovieDetails(id).subscribe((response) => (this.movie = response));
  }

  getMovieVideos(id: string) {
    this.moviesService.getMovieVideos(id).subscribe((response) => (this.movieVideos = response));
  }

  getMovieImages(id: string) {
    this.moviesService.getMovieImages(id).subscribe((response) => (this.movieImages = response));
  }

  getMovieCredits(id: string) {
    this.moviesService.getMovieCredits(id).subscribe((response) => (this.movieCredits = response));
  }
}
