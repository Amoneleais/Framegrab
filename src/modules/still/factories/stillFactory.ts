import { makeMovie } from 'src/modules/movie/factories/movieFactory';
import { Still } from '../entities/Still';

type Override = Partial<Still>;

export const makeStill = ({ id, ...override }: Override): Still => {
  return new Still(
    {
      url: 'http://example.com/frame.jpg',
      timestamp: 0,
      movie: makeMovie({}),
      movieId: '',
      ...override,
    },
    id,
  );
};
