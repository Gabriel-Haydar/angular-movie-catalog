import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { IMAGE_SIZES } from 'src/app/constants/images-sizes';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [
    trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('500ms')])])
  ]
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];
  readonly imageSizes = IMAGE_SIZES;

  currentSlideIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
    }, 5000);
  }
}
