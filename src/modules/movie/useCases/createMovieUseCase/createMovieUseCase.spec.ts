import path from 'path';
import { MovieRepositoryInMemory } from '../../repositories/MovieRepositoryInMemory';
import { CreateMovieUseCase } from './createMovieUseCase';

let movieRepositoryInMemory: MovieRepositoryInMemory;
let createMovieUseCase: CreateMovieUseCase;

describe('Create Movie', () => {
  beforeEach(() => {
    movieRepositoryInMemory = new MovieRepositoryInMemory();
    createMovieUseCase = new CreateMovieUseCase(movieRepositoryInMemory);
  });

  it('should be able to create a new movie', async () => {
    expect(movieRepositoryInMemory.movies).toHaveLength(0);

    const movie = await createMovieUseCase.execute({
      title: 'Inception',
      description: 'A mind-bending thriller',
      releaseDate: new Date('2010-07-16'),
      rating: 8.8,
      path: path.join(__dirname, 'inception.mp4'),
    });

    expect(movieRepositoryInMemory.movies).toEqual([movie]);
  });
});
