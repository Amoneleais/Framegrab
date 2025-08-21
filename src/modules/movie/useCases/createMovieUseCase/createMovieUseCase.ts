import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/MovieRepository';
import { Movie } from '../../entities/Movie';

interface CreateMovieRequest {
  title: string;
  description?: string | null;
  releaseDate: Date;
  rating?: number | null;
  path: string;
}

@Injectable()
export class CreateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    title,
    description,
    releaseDate,
    rating,
    path,
  }: CreateMovieRequest): Promise<Movie> {
    const movie = new Movie({
      title,
      description,
      releaseDate,
      rating,
      path,
    });

    await this.movieRepository.create(movie);

    return movie;
  }
}
