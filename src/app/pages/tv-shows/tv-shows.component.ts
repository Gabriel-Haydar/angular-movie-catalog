import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item';
import { MapTvShow2Item, TvShow, TvShowDto } from 'src/app/models/tvShow';
import { TvShowsService } from 'src/app/services/tv-shows.service';

@Component({
  selector: 'app-tv-shows',
  templateUrl: './tv-shows.component.html',
  styleUrls: ['./tv-shows.component.scss']
})
export class TvShowsComponent implements OnInit {
  tvShows: Item[] = [];
  tvShowDto: TvShowDto | null = null;
  genreId: string | null = null;
  searchValue: string = '';

  constructor(private tvShowsService: TvShowsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ genreId }) => {
      this.genreId = genreId;

      if (genreId) {
        this.getTvShowsPageByGenre(genreId, 1);
      } else {
        this.getTvShowsPage(1);
      }
    });
  }

  getTvShowsPage(page: number, searchValue?: string) {
    this.tvShowsService.searchTvShowsPage(page, searchValue).subscribe((response) => {
      this.tvShowDto = response;
      this.tvShows = response.results.map((tvShow) => MapTvShow2Item(tvShow));
    });
  }

  getTvShowsPageByGenre(genreId: string, page: number) {
    this.tvShowsService.getTvShowsPageByGenre(genreId, page).subscribe((response) => {
      this.tvShowDto = response;
      this.tvShows = response.results.map((tvShow) => MapTvShow2Item(tvShow));
    });
  }

  paginate(event: any) {
    const page = event.page + 1;
    if (this.genreId) {
      this.getTvShowsPageByGenre(this.genreId, page);
    } else {
      this.getTvShowsPage(page, this.searchValue);
    }
  }

  searchChange() {
    this.getTvShowsPage(1, this.searchValue);
  }
}
