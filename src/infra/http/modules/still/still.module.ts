import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { StillController } from './still.controller';
import { ExtractFramesUseCase } from '../../../../modules/still/useCases/extractFramesUseCase/extractFramesUseCase';
import { StillRepository } from 'src/modules/still/repositories/StillRepository';
import { PrismaStillRepository } from 'src/infra/database/prisma/repositories/PrismaStillRepository';
import { MovieRepository } from 'src/modules/movie/repositories/MovieRepository';
import { PrismaMovieRepository } from 'src/infra/database/prisma/repositories/PrismaMovieRepository';

@Module({
  imports: [DatabaseModule],
  controllers: [StillController],
  providers: [
    ExtractFramesUseCase,
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
