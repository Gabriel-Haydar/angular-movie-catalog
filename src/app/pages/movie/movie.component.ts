import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  imagesSizes = IMAGE_SIZES;
  movieCredits: MovieCredits | null = null;
  similarMovies: Movie[] = [];
  carouselResponsiveOptions = [
    {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 1
    }
  ];

  constructor(private route: ActivatedRoute, private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.getMovieData();
  }

  getMovieData() {
    this.route.params.subscribe(({ id }) => {
      this.getMovieFromId(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
      this.getSimilarMovies(id);
    });
  }

  getMovieFromId(id: string) {
    this.moviesService.getMovieDetails(id).subscribe((response) => {
      this.movie = response;
      this.getRoundRating();
    });
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

  getRoundRating() {
    if (this.movie) {
      const roundRating = Math.round(this.movie.vote_average * 10) / 10;
      this.movie.vote_average = roundRating;
    }
  }

  getSimilarMovies(id: string) {
    this.moviesService.getSimilarMovies(id, 6).subscribe((response) => (this.similarMovies = response));
  }
}
