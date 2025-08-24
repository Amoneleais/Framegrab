import { Movie } from 'src/modules/movie/entities/Movie';
import { Movie as MovieRaw } from '@prisma/client';

export class PrismaMovieMapper {
  static toPrisma({
    id,
    title,
    description,
    releaseDate,
    rating,
    path,
    createdAt,
    updatedAt,
  }: Movie): MovieRaw {
    return {
      id,
      title,
      description: description ?? null,
      releaseDate,
      rating: rating ?? null,
      path,
      createdAt,
      updatedAt,
    };
  }

  static toDomain({
    id,
    title,
    description,
    releaseDate,
    rating,
    path,
    createdAt,
    updatedAt,
  }: MovieRaw): Movie {
    return new Movie(
      {
        title,
        description: description ?? null,
        releaseDate,
        rating: rating ?? null,
        path,
        createdAt,
        updatedAt,
      },
      id,
    );
  }
}
