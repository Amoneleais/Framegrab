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
  async getAll(page: number, limit: number): Promise<Movie[]> {
    const prismaMovies = await this.prisma.movie.findMany({
      skip: (page - 1) * limit,
      take: limit,
    });
    return prismaMovies.map((movie) => PrismaMovieMapper.toDomain(movie));
  }
  async delete(id: string): Promise<void> {
    await this.prisma.movie.delete({
      where: { id },
    });
  }
  async findById(id: string): Promise<Movie | null> {
    const prismaMovie = await this.prisma.movie.findUnique({
      where: { id },
    });

    if (!prismaMovie) {
      return null;
    }

    return PrismaMovieMapper.toDomain(prismaMovie);
  }
  async update(movie: Movie): Promise<void> {
    const prismaMovie = PrismaMovieMapper.toPrisma(movie);
    await this.prisma.movie.update({
      where: { id: movie.id },
      data: prismaMovie,
    });
  }
}
