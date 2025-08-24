import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { CreateMovieUseCase } from 'src/modules/movie/useCases/createMovieUseCase/createMovieUseCase';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  controllers: [MovieController],
  imports: [DatabaseModule],
  providers: [CreateMovieUseCase],
})
export class MovieModule {}
