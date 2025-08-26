import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateMovieUseCase } from 'src/modules/movie/useCases/createMovieUseCase/createMovieUseCase';
import { GetAllMoviesUseCase } from 'src/modules/movie/useCases/getAllMoviesUseCase/getAllMoviesUseCase';
import { CreateMovieBody } from './dto/createMovieBody';
import { MovieViewModel } from './viewModel/movieViewModel';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly createMovieUseCase: CreateMovieUseCase,
    private readonly getAllMoviesUseCase: GetAllMoviesUseCase,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Movie created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request payload' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  @ApiOperation({ summary: 'Create a new movie' })
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

  @Get()
  @ApiOperation({ summary: 'Get all movies with pagination' })
  @ApiResponse({ status: 200, description: 'Movies retrieved successfully' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async getAllMovies(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    const movies = await this.getAllMoviesUseCase.execute({ page, limit });

    return movies.map((movie) => MovieViewModel.toHTTP(movie));
  }
}
