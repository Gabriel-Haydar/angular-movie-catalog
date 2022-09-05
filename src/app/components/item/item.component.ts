import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import { IMAGE_SIZES } from '../../constants/images-sizes';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  readonly imageSizes = IMAGE_SIZES;
  poster: string = '';

  constructor() {}

  ngOnInit(): void {
    this.getMoviePoster();
    this.getRoundRating();
  }

  getMoviePoster() {
    if (this.itemData) {
      this.poster = this.imageSizes.small + this.itemData.poster_path;
    }
  }

  getRoundRating() {
    if (this.itemData) {
      const roundRating = Math.round(this.itemData.vote_average * 10) / 10;
      this.itemData.vote_average = roundRating;
    }
  }

  setDefaultPoster(): void {
    this.poster = '../../../assets/images/unavailable_poster.png';
  }
}
