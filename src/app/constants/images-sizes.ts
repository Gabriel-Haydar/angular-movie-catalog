import { environment } from 'src/environments/environment';

const imageBaseUrl: string = environment.apiImageBaseUrl;

export const IMAGE_SIZES = {
  small: imageBaseUrl + 'w342',
  medium: imageBaseUrl + 'w500',
  large: imageBaseUrl + 'original'
};
