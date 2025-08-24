import { Movie } from '../entities/Movie';

export abstract class MovieRepository {
  abstract create(movie: Movie): Promise<void>;
  abstract getAll(page: number, limit: number): Promise<Movie[]>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Movie | null>;
  abstract update(movie: Movie): Promise<void>;
}
