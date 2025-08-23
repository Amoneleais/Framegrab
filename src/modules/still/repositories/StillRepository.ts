import { Still } from '../entities/Still';

export abstract class StillRepository {
  abstract create(still: Still): Promise<void>;
  abstract createMany(stills: Still[]): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Still | null>;
}
