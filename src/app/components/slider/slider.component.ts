import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IMAGE_SIZES } from '../../constants/images-sizes';
import { Item } from '../../models/item';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations: [trigger('slideFade', [state('void', style({ opacity: 0 })), transition('void <=> *', [animate('1s')])])]
})
export class SliderComponent implements OnInit, OnDestroy {
  @Input() items: Item[] = [];
  @Input() isBanner: boolean = false;
  slideInterval: any;
  readonly imageSizes = IMAGE_SIZES;

  currentSlideIndex: number = 0;

  constructor() {}

  ngOnInit(): void {
    if (!this.isBanner) {
      this.slideInterval = setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }
}
