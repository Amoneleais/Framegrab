import { makeMovie } from '../../factories/movieFactory';
import { MovieRepositoryInMemory } from '../../repositories/MovieRepositoryInMemory';
import { DeleteMovieUseCase } from './deleteMovieUseCase';

let movieRepositoryInMemory: MovieRepositoryInMemory;
let deleteMovieUseCase: DeleteMovieUseCase;

describe('Delete Movie', () => {
  beforeEach(() => {
    movieRepositoryInMemory = new MovieRepositoryInMemory();
    deleteMovieUseCase = new DeleteMovieUseCase(movieRepositoryInMemory);
  });

  it('should be able to delete a movie by ID', async () => {
    const movie = makeMovie({});
    movieRepositoryInMemory.movies.push(movie);

    await deleteMovieUseCase.execute(movie.id);

    expect(movieRepositoryInMemory.movies).toHaveLength(0);
  });

  it('should throw an error if no ID is provided', async () => {
    await expect(deleteMovieUseCase.execute('')).rejects.toThrow(
      'Movie ID is required',
    );
  });

  it('should not throw an error if the movie does not exist', async () => {
    await expect(
      deleteMovieUseCase.execute('non-existing-id'),
    ).resolves.not.toThrow();
  });
});
