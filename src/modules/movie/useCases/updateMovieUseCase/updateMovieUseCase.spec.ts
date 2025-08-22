import { NotFoundException } from '@nestjs/common';
import { makeMovie } from '../../factories/movieFactory';
import { MovieRepositoryInMemory } from '../../repositories/MovieRepositoryInMemory';
import { UpdateMovieUseCase } from './updateMovieUseCase';

let movieRepositoryInMemory: MovieRepositoryInMemory;
let updateMovieUseCase: UpdateMovieUseCase;

describe('Update Movie Use Case', () => {
  beforeEach(() => {
    movieRepositoryInMemory = new MovieRepositoryInMemory();
    updateMovieUseCase = new UpdateMovieUseCase(movieRepositoryInMemory);
  });

  it('should update a movie successfully', async () => {
    const movie = makeMovie({});
    movieRepositoryInMemory.movies.push(movie);

    const updatedMovie = {
      title: 'Updated Title',
      description: 'Updated Description',
      releaseDate: new Date('2023-01-01'),
      rating: 8.5,
      path: '/updated/path/to/movie',
    };

    await updateMovieUseCase.execute({
      id: movie.id,
      title: updatedMovie.title,
      description: updatedMovie.description,
      releaseDate: updatedMovie.releaseDate,
      rating: updatedMovie.rating,
      path: updatedMovie.path,
    });

    expect(movieRepositoryInMemory.movies[0].title).toBe(updatedMovie.title);
    expect(movieRepositoryInMemory.movies[0].description).toBe(
      updatedMovie.description,
    );
    expect(movieRepositoryInMemory.movies[0].releaseDate).toEqual(
      updatedMovie.releaseDate,
    );
    expect(movieRepositoryInMemory.movies[0].rating).toBe(updatedMovie.rating);
    expect(movieRepositoryInMemory.movies[0].path).toBe(updatedMovie.path);
    expect(movieRepositoryInMemory.movies[0].updatedAt).toBeInstanceOf(Date);
  });
  it('should throw NotFoundException if movie does not exist', async () => {
    await expect(
      updateMovieUseCase.execute({
        id: 'non-existing-id',
        title: 'Title',
        description: 'Description',
        releaseDate: new Date('2023-01-01'),
        rating: 7.0,
        path: '/path/to/movie',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
