import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class FindMovieByIdBody {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => String)
  id: string;
}
