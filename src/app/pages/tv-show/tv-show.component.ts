import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IMAGE_SIZES } from 'src/app/constants/images-sizes';
import { Item } from 'src/app/models/item';
import { TvShowsService } from 'src/app/services/tv-shows.service';
import { MapTvShow2Item, TvShow, TvShowCredits, TvShowImages, TvShowVideo } from '../../models/tvShow';

@Component({
  selector: 'app-tv-show',
  templateUrl: './tv-show.component.html',
  styleUrls: ['./tv-show.component.scss']
})
export class TvShowComponent implements OnInit {
  tvShow: TvShow | null = null;
  tvShowItem: Item | null = null;
  tvShowVideos: TvShowVideo[] = [];
  tvShowImages: TvShowImages | null = null;
  imagesSizes = IMAGE_SIZES;
  tvShowCredits: TvShowCredits | null = null;
  similarTvShows: Item[] = [];
  responsiveOptions = [
    {
      breakpoint: '600px',
      numVisible: 3,
      numScroll: 1
    }
  ];

  constructor(private route: ActivatedRoute, private tvShowsService: TvShowsService) {}

  ngOnInit(): void {
    this.getMovieData();
  }

  getMovieData() {
    this.route.params.subscribe(({ id }) => {
      this.getTvShowFromId(id);
      this.getTvShowVideos(id);
      this.getTvShowImages(id);
      this.getTvShowCredits(id);
      this.getSimilarMovies(id);
    });
  }

  getTvShowFromId(id: string) {
    this.tvShowsService.getTvShowDetails(id).subscribe((response) => {
      this.tvShow = response;
      this.tvShowItem = MapTvShow2Item(response);
      this.getRoundRating();
    });
  }

  getTvShowVideos(id: string) {
    this.tvShowsService.getTvShowVideos(id).subscribe((response) => (this.tvShowVideos = response));
  }

  getTvShowImages(id: string) {
    this.tvShowsService.getTvShowImages(id).subscribe((response) => (this.tvShowImages = response));
  }

  getTvShowCredits(id: string) {
    this.tvShowsService.getTvShowCredits(id).subscribe((response) => (this.tvShowCredits = response));
  }

  getRoundRating() {
    if (this.tvShowItem) {
      const roundRating = Math.round(this.tvShowItem.vote_average * 10) / 10;
      this.tvShowItem.vote_average = roundRating;
    }
  }

  getSimilarMovies(id: string) {
    this.tvShowsService
      .getSimilarTvShows(id, 6)
      .subscribe((response) => (this.similarTvShows = response.map((tvShow) => MapTvShow2Item(tvShow))));
  }
}
