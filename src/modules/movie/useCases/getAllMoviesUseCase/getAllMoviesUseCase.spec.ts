import { makeMovie } from '../../factories/movieFactory';
import { MovieRepositoryInMemory } from '../../repositories/MovieRepositoryInMemory';
import { GetAllMoviesUseCase } from './getAllMoviesUseCase';

let movieRepositoryInMemory: MovieRepositoryInMemory;
let getAllMoviesUseCase: GetAllMoviesUseCase;

describe('Get All Movies', () => {
  beforeEach(() => {
    movieRepositoryInMemory = new MovieRepositoryInMemory();
    getAllMoviesUseCase = new GetAllMoviesUseCase(movieRepositoryInMemory);
  });

  it('should be able to get all movies with default pagination', async () => {
    const movies = Array.from({ length: 10 }, () => makeMovie({}));

    movieRepositoryInMemory.movies = movies;

    const result = await getAllMoviesUseCase.execute({});

    expect(result).toEqual(movies);
  });

  it('should be able to get all movies with custom pagination', async () => {
    const movies = Array.from({ length: 25 }, (_, i) =>
      makeMovie({ title: `Movie ${i + 1}` }),
    );

    movieRepositoryInMemory.movies = movies;

    const page = 2;
    const limit = 10;

    const result = await getAllMoviesUseCase.execute({ page, limit });

    expect(result).toEqual(movies.slice(10, 20));
  });
});
