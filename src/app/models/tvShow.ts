import { Genre } from './genre';
import { Item } from './item';

export interface TvShow {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
  genres: Genre[];
  number_of_seasons: string;
  number_of_episodes: string;
  status: string;
  last_air_date: string;
  networks: {
    name: string;
    logo_path: string;
  };
}

export interface TvShowDto {
  page: number;
  results: TvShow[];
  total_results: number;
  total_pages: number;
}

export interface TvShowVideo {
  site: string;
  key: string;
}

export interface TvShowVideoDto {
  id: number;
  results: TvShowVideo[];
}

export interface TvShowImages {
  backdrops: {
    file_path: string;
  }[];
}

export interface TvShowCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}

export const MapTvShow2Item = (tvShow: TvShow): Item => {
  const item: Item = {
    id: tvShow.id,
    backdrop_path: tvShow.backdrop_path,
    overview: tvShow.overview,
    poster_path: tvShow.poster_path,
    vote_average: tvShow.vote_average,
    vote_count: tvShow.vote_count,
    title: tvShow.name,
    release_date: tvShow.first_air_date
  };
  return item;
};
