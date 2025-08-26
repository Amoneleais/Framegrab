import { makeMovie } from '../../factories/movieFactory';
import { MovieRepositoryInMemory } from '../../repositories/MovieRepositoryInMemory';
import { FindMovieByIdUseCase } from './findMovieByIdUseCase';

let movieRepositoryInMemory: MovieRepositoryInMemory;
let findMovieByIdUseCase: FindMovieByIdUseCase;

describe('Find Movie by ID', () => {
  beforeEach(() => {
    movieRepositoryInMemory = new MovieRepositoryInMemory();
    findMovieByIdUseCase = new FindMovieByIdUseCase(movieRepositoryInMemory);
  });

  it('should be able to find a movie by ID', async () => {
    const movie = makeMovie({});
    movieRepositoryInMemory.movies.push(movie);

    const foundMovie = await findMovieByIdUseCase.execute(movie.id);

    expect(foundMovie).toEqual(movie);
  });

  it('should return null if the movie does not exist', async () => {
    const foundMovie = await findMovieByIdUseCase.execute('non-existing-id');

    expect(foundMovie).toBeNull();
  });

  it('should throw an error if no ID is provided', async () => {
    await expect(findMovieByIdUseCase.execute('')).rejects.toThrow(
      'Movie ID is required',
    );
  });
});
