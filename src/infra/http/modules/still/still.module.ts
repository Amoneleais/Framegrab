import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { StillController } from './still.controller';
import { ExtractStillsUseCase } from '../../../../modules/still/useCases/extractStillsUseCase/extractStillsUseCase';
import { StillRepository } from 'src/modules/still/repositories/StillRepository';
import { PrismaStillRepository } from 'src/infra/database/prisma/repositories/PrismaStillRepository';
import { MovieRepository } from 'src/modules/movie/repositories/MovieRepository';
import { PrismaMovieRepository } from 'src/infra/database/prisma/repositories/PrismaMovieRepository';
import { FFmpegService } from 'src/infra/ffmpeg/ffmpeg.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StillController],
  providers: [
    ExtractStillsUseCase,
    FFmpegService,
    {
      provide: StillRepository,
      useClass: PrismaStillRepository,
    },
    {
      provide: MovieRepository,
      useClass: PrismaMovieRepository,
    },
  ],
})
export class StillModule {}
