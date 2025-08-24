import { Movie } from 'src/modules/movie/entities/Movie';

export class MovieViewModel {
  static toHTTP({ id, title, description, releaseDate, rating, path }: Movie) {
    return {
      id,
      title,
      description,
      releaseDate: releaseDate.toISOString(),
      rating,
      path,
    };
  }
}
