/* eslint-disable @typescript-eslint/no-unused-vars */
import { Movie } from 'src/modules/movie/entities/Movie';
import { MovieRepository } from 'src/modules/movie/repositories/MovieRepository';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaMovieMapper } from '../mappers/PrismaMovieMapper';

@Injectable()
export class PrismaMovieRepository implements MovieRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(movie: Movie): Promise<void> {
    const prismaMovie = PrismaMovieMapper.toPrisma(movie);
    await this.prisma.movie.create({
      data: prismaMovie,
    });
  }
  getAll(page: number, limit: number): Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!movie) {
      return null;
    }

    return PrismaMovieMapper.toDomain(movie);
  }
  update(movie: Movie): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
