import cuid from 'cuid';
import { Replace } from '../../../utils/replace';

interface MovieSchema {
  title: string;
  description: string | null;
  releaseDate: Date;
  rating: number | null;
  path: string;
  createdAt: Date;
  updatedAt: Date;
  stills: [];
}

export class Movie {
  private readonly props: MovieSchema;
  private readonly _id: string;

  constructor(
    props: Replace<
      MovieSchema,
      {
        createdAt?: Date;
        updatedAt?: Date;
        description?: string | null;
        rating?: number | null;
        stills?: [];
      }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt || new Date(),
      updatedAt: props.updatedAt || new Date(),
      description: props.description ?? null,
      rating: props.rating ?? null,
      stills: props.stills ?? [],
    };
    this._id = id || cuid();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  set title(title: string) {
    this.props.title = title;
  }

  get description(): string | null {
    return this.props.description;
  }

  set description(description: string | null) {
    this.props.description = description;
  }

  get releaseDate(): Date {
    return this.props.releaseDate;
  }

  set releaseDate(releaseDate: Date) {
    this.props.releaseDate = releaseDate;
  }

  get rating(): number | null {
    return this.props.rating;
  }

  set rating(rating: number | null) {
    this.props.rating = rating;
  }

  get path(): string {
    return this.props.path;
  }

  set path(path: string) {
    this.props.path = path;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get stills(): [] {
    return this.props.stills;
  }

  set stills(stills: []) {
    this.props.stills = stills;
  }
}
