import { Controller, Post, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ExtractStillsUseCase } from '../../../../modules/still/useCases/extractStillsUseCase/extractStillsUseCase';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('stills')
@Controller('stills')
export class StillController {
  constructor(private extractStillsUseCase: ExtractStillsUseCase) {}

  @Post('extract/:movieId')
  @ApiOperation({ summary: 'Extract stills from a movie' })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie to extract stills from',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    description: 'Interval in seconds between stills (default: 1)',
    type: Number,
  })
  async extractStills(
    @Param('movieId') movieId: string,
    @Query('interval', new ParseIntPipe({ optional: true })) interval?: number,
  ) {
    return this.extractStillsUseCase.execute(movieId, interval);
  }
}
