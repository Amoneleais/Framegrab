import { Still } from '../entities/Still';
import { StillRepository } from './StillRepository';

export class StillRepositoryInMemory implements StillRepository {
  public stills: Still[] = [];

  async create(still: Still): Promise<void> {
    this.stills.push(still);
    await Promise.resolve();
  }

  async createMany(stills: Still[]): Promise<void> {
    this.stills.push(...stills);
    await Promise.resolve();
  }

  async delete(id: string): Promise<void> {
    this.stills = this.stills.filter((still) => still.id !== id);
    await Promise.resolve();
  }

  async findById(id: string): Promise<Still | null> {
    const still = this.stills.find((still) => still.id === id);
    return Promise.resolve(still || null);
  }
}
