import { Movie } from '../entities/Movie';

export abstract class MovieRepository {
  abstract create(movie: Movie): Promise<void>;
  /*   abstract findById(id: string): Promise<Movie | null>;
  abstract findByTitle(title: string): Promise<Movie | null>;
  abstract findAll(): Promise<Movie[]>;
  abstract update(movie: Movie): Promise<void>;
  abstract delete(id: string): Promise<void>; */
}
