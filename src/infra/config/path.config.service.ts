import { Injectable } from '@nestjs/common';
import * as path from 'path';

@Injectable()
export class PathConfigService {
  get moviesPath(): string {
    return process.env.MOVIES_PATH || path.join(process.cwd(), 'movies');
  }

  get outputPath(): string {
    return process.env.OUTPUT_PATH || path.join(process.cwd(), 'output');
  }
}
