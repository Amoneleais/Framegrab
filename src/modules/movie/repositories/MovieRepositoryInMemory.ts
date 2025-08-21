import { Movie } from '../entities/Movie';
import { MovieRepository } from './MovieRepository';

export class MovieRepositoryInMemory implements MovieRepository {
  public movies: Movie[] = [];

  async create(movie: Movie): Promise<void> {
    this.movies.push(movie);
    return Promise.resolve();
  }

  async getAll(page: number, limit: number): Promise<Movie[]> {
    return Promise.resolve(this.movies.slice((page - 1) * limit, page * limit));
  }
}
