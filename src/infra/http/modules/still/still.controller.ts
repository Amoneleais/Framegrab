import { Controller, Post, Param, Query, ParseIntPipe } from '@nestjs/common';
import { ExtractFramesUseCase } from '../../../../modules/still/useCases/extractFramesUseCase/extractFramesUseCase';
import { ApiTags, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('stills')
@Controller('stills')
export class StillController {
  constructor(private extractFramesUseCase: ExtractFramesUseCase) {}

  @Post('extract/:movieId')
  @ApiOperation({ summary: 'Extract frames from a movie' })
  @ApiParam({
    name: 'movieId',
    description: 'The ID of the movie to extract frames from',
  })
  @ApiQuery({
    name: 'interval',
    required: false,
    description: 'Interval in seconds between frames (default: 1)',
    type: Number,
  })
  async extractFrames(
    @Param('movieId') movieId: string,
    @Query('interval', new ParseIntPipe({ optional: true })) interval?: number,
  ) {
    return this.extractFramesUseCase.execute(movieId, interval);
  }
}
