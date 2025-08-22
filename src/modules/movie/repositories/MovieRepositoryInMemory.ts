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

  async findById(id: string): Promise<Movie | null> {
    const movie = this.movies.find((movie) => movie.id === id);
    return Promise.resolve(movie || null);
  }

  async update(movie: Movie): Promise<void> {
    const index = this.movies.findIndex((m) => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
    }
    return Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    this.movies = this.movies.filter((movie) => movie.id !== id);
    return Promise.resolve();
  }
}
