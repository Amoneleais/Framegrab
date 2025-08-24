import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/MovieRepository';

@Injectable()
export class DeleteMovieUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new Error('Movie ID is required');
    }

    await this.movieRepository.delete(id);
  }
}
