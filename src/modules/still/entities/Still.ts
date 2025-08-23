import { Movie } from '../../movie/entities/Movie';
import { Replace } from '../../../utils/replace';
import cuid from 'cuid';

interface StillSchema {
  url: string;
  timestamp: number;
  createdAt: Date;
  movie: Movie;
  movieId: string;
}

export class Still {
  private readonly props: StillSchema;
  private readonly _id: string;

  constructor(
    props: Replace<
      StillSchema,
      {
        createdAt?: Date;
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
    this._id = id || cuid();
  }

  get id(): string {
    return this._id;
  }

  get url(): string {
    return this.props.url;
  }

  set url(url: string) {
    this.props.url = url;
  }

  get timestamp(): number {
    return this.props.timestamp;
  }

  set timestamp(timestamp: number) {
    this.props.timestamp = timestamp;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get movie(): Movie {
    return this.props.movie;
  }

  get movieId(): string {
    return this.props.movieId;
  }
}
