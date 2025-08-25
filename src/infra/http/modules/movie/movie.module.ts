import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateMovieUseCase } from 'src/modules/movie/useCases/createMovieUseCase/createMovieUseCase';
import { GetAllMoviesUseCase } from 'src/modules/movie/useCases/getAllMoviesUseCase/getAllMoviesUseCase';

@Module({
  controllers: [MovieController],
  imports: [DatabaseModule],
  providers: [CreateMovieUseCase, GetAllMoviesUseCase],
})
export class MovieModule {}
