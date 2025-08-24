import { Injectable } from '@nestjs/common';
import { MovieRepository } from '../../repositories/MovieRepository';
import { Movie } from '../../entities/Movie';

interface GetAllMoviesRequest {
  page?: number;
  limit?: number;
}

@Injectable()
export class GetAllMoviesUseCase {
  constructor(private readonly movieRepository: MovieRepository) {}

  async execute({ page, limit }: GetAllMoviesRequest): Promise<Movie[]> {
    const DEFAULT_PAGE = 1;
    const DEFAULT_LIMIT = 10;

    const currentPage = page && page > 0 ? page : DEFAULT_PAGE;
    const currentLimit = limit && limit > 0 ? limit : DEFAULT_LIMIT;

    const movies = await this.movieRepository.getAll(currentPage, currentLimit);

    return movies;
  }
}
