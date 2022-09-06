import { Component, Input } from '@angular/core';
import { Item } from '../../models/item';

@Component({
  selector: 'app-items-banner',
  templateUrl: './items-banner.component.html',
  styleUrls: ['./items-banner.component.scss']
})
export class ItemsBannerComponent {
  @Input() items: Item[] = [];
  @Input() title: string = '';
  @Input() typeUri: '/movie/' | '/tv/' = '/movie/';
}
