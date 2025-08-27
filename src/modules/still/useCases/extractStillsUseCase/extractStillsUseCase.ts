import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { FFmpegService } from '../../../../infra/ffmpeg/ffmpeg.service';
import { StillRepository } from '../../repositories/StillRepository';
import { MovieRepository } from '../../../movie/repositories/MovieRepository';
import { Still } from '../../entities/Still';
import { makeStill } from '../../factories/stillFactory';

interface ExtractStillsRequest {
  movieId: string;
  interval?: number;
}

@Injectable()
export class ExtractStillsUseCase {
  constructor(
    private readonly stillRepository: StillRepository,
    private readonly movieRepository: MovieRepository,
    private readonly ffmpegService: FFmpegService,
  ) {}

  async execute({
    movieId,
    interval = 1,
  }: ExtractStillsRequest): Promise<Still[]> {
    const movie = await this.movieRepository.findById(movieId);

    if (!movie) {
      throw new Error('Movie not found');
    }

    const stillsPath =
      process.platform === 'win32'
        ? path.join(process.cwd(), 'output')
        : '/usr/src/app/output';
    const outputDir = path.join(stillsPath, movie.title);
    await fs.mkdir(outputDir, { recursive: true });

    const candidateMoviePaths = [
      path.join('/usr/src/app/movies', movie.path),
      path.join(process.cwd(), 'movies', movie.path),
      movie.path,
    ];

    let moviePath: string | undefined;
    for (const candidate of candidateMoviePaths) {
      try {
        await fs.access(candidate);
        moviePath = candidate;
        break;
      } catch {
        // ignore missing candidate
      }
    }

    if (!moviePath) {
      throw new Error(
        `Movie file not found. Tried: ${candidateMoviePaths.join(', ')}`,
      );
    }

    await this.ffmpegService.extractFrames(moviePath, outputDir, interval);

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
}
