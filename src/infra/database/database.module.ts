import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMovieRepository } from './prisma/repositories/PrismaMovieRepository';
import { MovieRepository } from 'src/modules/movie/repositories/MovieRepository';
import { StillRepository } from 'src/modules/still/repositories/StillRepository';
import { PrismaStillRepository } from './prisma/repositories/PrismaStillRepository';

@Module({
  providers: [
    PrismaService,
    { provide: MovieRepository, useClass: PrismaMovieRepository },
    { provide: StillRepository, useClass: PrismaStillRepository },
  ],
  exports: [MovieRepository, StillRepository, PrismaService],
})
export class DatabaseModule {}
