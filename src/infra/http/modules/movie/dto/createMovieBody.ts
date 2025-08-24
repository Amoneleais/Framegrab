import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The title of the movie',
    example: 'Inception',
  })
  title: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    description: 'The description of the movie',
    example:
      'A thief who steals corporate secrets through the use of dream-sharing technology.',
    required: false,
  })
  description?: string | null;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  @ApiProperty({
    description: 'The release date of the movie',
    example: '2010-07-16T00:00:00Z',
  })
  releaseDate: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(10)
  @ApiProperty({
    description: 'The rating of the movie',
    example: 8,
    required: false,
  })
  rating?: number | null;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The path to the movie file',
    example: '/movies/inception.mp4',
  })
  path: string;
}
