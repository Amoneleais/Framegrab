import { Still } from 'src/modules/still/entities/Still';
import { Movie, Still as StillRaw } from '@prisma/client';
import { PrismaMovieMapper } from './PrismaMovieMapper';

export class PrismaStillMapper {
  static toPrisma({ id, url, timestamp, createdAt, movieId }: Still): StillRaw {
    return {
      id,
      url,
      timestamp,
      createdAt,
      movieId,
    };
  }

  static toDomain({
    id,
    url,
    timestamp,
    createdAt,
    movieId,
    movie,
  }: StillRaw & { movie: Movie }): Still {
    return new Still(
      {
        url,
        timestamp,
        createdAt,
        movieId,
        movie: PrismaMovieMapper.toDomain(movie),
      },
      id,
    );
  }
}
