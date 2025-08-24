import { Injectable, NotFoundException } from '@nestjs/common';
import { MovieRepository } from '../../repositories/MovieRepository';

interface IRequest {
  id: string;
  title: string;
  description: string | null;
  releaseDate: Date;
  rating: number | null;
  path: string;
}

@Injectable()
export class UpdateMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({
    id,
    title,
    description,
    releaseDate,
    rating,
    path,
  }: IRequest): Promise<void> {
    const movie = await this.movieRepository.findById(id);
    if (!movie) {
      throw new NotFoundException('Movie not found');
    }
    movie.title = title;
    movie.description = description;
    movie.releaseDate = releaseDate;
    movie.rating = rating;
    movie.path = path;
    movie.updatedAt = new Date();
    await this.movieRepository.update(movie);
    return Promise.resolve();
  }
}
