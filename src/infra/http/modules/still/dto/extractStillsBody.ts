import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class ExtractStillsBody {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The ID of the movie to extract stills from',
    example: 'clv2v4s5q000012mkh31l51cr',
  })
  movieId: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Interval in seconds between stills',
    example: 5,
    default: 1,
    required: false,
  })
  interval?: number;
}
