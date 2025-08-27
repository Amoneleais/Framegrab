import { Movie } from 'src/modules/movie/entities/Movie';

export class MovieViewModel {
  static toHTTP({
    id,
    title,
    description,
    releaseDate,
    rating,
    createdAt,
    updatedAt,
    path,
    stills,
  }: Movie) {
    return {
      id,
      title,
      description,
      releaseDate: releaseDate.toISOString(),
      rating,
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
      path,
      stills,
    };
  }
}
