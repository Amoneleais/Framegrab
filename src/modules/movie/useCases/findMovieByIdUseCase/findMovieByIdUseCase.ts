import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/MovieRepository';
import { Movie } from '@prisma/client';

@Injectable()
export class FindMovieByIdUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<Movie | null> {
    if (!id) {
      throw new Error('Movie ID is required');
    }

    const movie = await this.movieRepository.findById(id);
    return movie;
  }
}
