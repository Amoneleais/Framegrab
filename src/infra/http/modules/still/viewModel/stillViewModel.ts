import { Still } from 'src/modules/still/entities/Still';

export class StillViewModel {
  static toHTTP({ id, movieId, url, createdAt }: Still) {
    return {
      id,
      movieId,
      url,
      createdAt: createdAt.toISOString(),
    };
  }
}
