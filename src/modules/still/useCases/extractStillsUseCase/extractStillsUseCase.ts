import { Injectable } from '@nestjs/common';
import { spawn, SpawnOptions } from 'child_process';
import * as path from 'path';
import * as fs from 'fs/promises';
import { StillRepository } from '../../repositories/StillRepository';
import { MovieRepository } from '../../../movie/repositories/MovieRepository';
import { Still } from '../../entities/Still';
import { makeStill } from '../../factories/stillFactory';

@Injectable()
export class ExtractStillsUseCase {
  constructor(
    private readonly stillRepository: StillRepository,
    private readonly movieRepository: MovieRepository,
  ) {}

  private safeSpawn(
    command: string,
    args: string[],
    options: SpawnOptions = {},
  ) {
    return spawn(command, args, {
      ...options,
      env: {
        PATH: '/usr/bin:/bin:/usr/local/bin',
        ...(options.env ?? {}),
      },
    });
  }

  async execute(movieId: string, interval: number = 1): Promise<Still[]> {
    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const stillsPath = '/usr/src/app/output';
    const outputDir = path.join(stillsPath, movie.title);
    await fs.mkdir(outputDir, { recursive: true });

    const moviePath = path.join('/usr/src/app/movies', movie.path);

    const args = [
      '-hide_banner',
      '-loglevel',
      'info',
      '-i',
      moviePath,
      '-vf',
      `fps=1/${interval}`,
      path.join(outputDir, 'frame-%d.jpg'),
    ];

    await new Promise<void>((resolve, reject) => {
      const ffmpeg = this.safeSpawn('ffmpeg', args);

      ffmpeg.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`ffmpeg exited with code ${code}`));
        }
      });

      ffmpeg.on('error', (err) => {
        reject(new Error(`Failed to start ffmpeg: ${err.message}`));
      });
    });

    const files = await fs.readdir(outputDir);
    const jpgFiles = files.filter((file) => file.endsWith('.jpg'));

    const stills: Still[] = [];

    for (const file of jpgFiles) {
      const frameNumberMatch = RegExp(/frame-(\d+)\.jpg/).exec(file);
      if (frameNumberMatch) {
        const frameNumber = parseInt(frameNumberMatch[1]);
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
    }

    await this.stillRepository.createMany(stills);

    return stills;
  }

  private async getMovieDuration(filePath: string): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      const ffprobe = this.safeSpawn('ffprobe', [
        '-v',
        'error',
        '-show_entries',
        'format=duration',
        '-of',
        'default=noprint_wrappers=1:nokey=1',
        filePath,
      ]);

      let output = '';
      ffprobe.stdout!.on('data', (data: Buffer) => {
        output += data.toString();
      });

      ffprobe.on('close', (code) => {
        if (code === 0 && output) {
          resolve(parseFloat(output));
        } else {
          reject(
            new Error(
              `ffprobe exited with code ${code} or produced no output.`,
            ),
          );
        }
      });

      ffprobe.on('error', (err) => {
        reject(new Error(`Failed to start ffprobe: ${err.message}`));
      });
    });
  }
}
