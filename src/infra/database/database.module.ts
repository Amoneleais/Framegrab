import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaMovieRepository } from './prisma/repositories/PrismaMovieRepository';
import { MovieRepository } from 'src/modules/movie/repositories/MovieRepository';

@Module({
  providers: [
    PrismaService,
    { provide: MovieRepository, useClass: PrismaMovieRepository },
  ],
  exports: [MovieRepository],
})
export class DatabaseModule {}
