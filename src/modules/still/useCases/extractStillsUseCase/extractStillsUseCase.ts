import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as path from 'path';
import * as fs from 'fs/promises';
import { StillRepository } from '../../repositories/StillRepository';
import { MovieRepository } from '../../../movie/repositories/MovieRepository';
import { Still } from '../../entities/Still';
import { makeStill } from '../../factories/stillFactory';

const execAsync = promisify(exec);

@Injectable()
export class ExtractStillsUseCase {
  constructor(
    private stillRepository: StillRepository,
    private movieRepository: MovieRepository,
  ) {}

  async execute(movieId: string, interval: number = 1): Promise<Still[]> {
    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const stillsPath = '/usr/src/app/output';

    const outputDir = path.join(stillsPath, movie.title);
    await fs.mkdir(outputDir, { recursive: true });

    const moviePath = path.join('/usr/src/app/movies', movie.path);

    const command = `ffmpeg -i "${moviePath}" -vf fps=1/${interval} "${path.join(outputDir, 'frame-%d.jpg')}"`;

    try {
      await execAsync(command);

      const files = await fs.readdir(outputDir);
      const jpgFiles = files.filter((file) => file.endsWith('.jpg'));

      const stills: Still[] = [];

      for (const file of jpgFiles) {
        const frameNumber = parseInt(file.match(/frame-(\d+)\.jpg/)![1]);
        const timestamp = frameNumber * interval;
        const url = path.join(movie.title, file);

        const still = makeStill({
          url,
          timestamp,
          movieId: movie.id,
          movie,
        });

        stills.push(still);
      }

      await this.stillRepository.createMany(stills);

      return stills;
    } catch (error) {
      throw new Error(
        `Failed to extract stills: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
