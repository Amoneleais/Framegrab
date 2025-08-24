import { Movie } from '../entities/Movie';

type Override = Partial<Movie>;

export const makeMovie = ({ id, ...override }: Override): Movie => {
  return new Movie(
    {
      title: 'Default Title',
      description: null,
      releaseDate: new Date(),
      rating: null,
      path: 'path/to/movie.mp4',
      ...override,
    },
    id,
  );
};
