import { Body, Controller, Post } from '@nestjs/common';
import { CreateMovieUseCase } from 'src/modules/movie/useCases/createMovieUseCase/createMovieUseCase';
import { CreateMovieBody } from './dto/createMovieBody';
import { MovieViewModel } from './viewModel/movieViewModel';

@Controller('movies')
export class MovieController {
  constructor(private readonly createMovieUseCase: CreateMovieUseCase) {}

  @Post()
  async create(@Body() body: CreateMovieBody) {
    const { title, description, releaseDate, rating, path } = body;

    const movie = await this.createMovieUseCase.execute({
      title,
      description,
      releaseDate: new Date(releaseDate),
      rating,
      path,
    });

    return MovieViewModel.toHTTP(movie);
  }
}
