import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExtractStillsUseCase } from 'src/modules/still/useCases/extractStillsUseCase/extractStillsUseCase';
import { ExtractStillsBody } from './dto/extractStillsBody';
import { StillViewModel } from './viewModel/stillViewModel';

@ApiTags('Stills')
@Controller('stills')
export class StillController {
  constructor(private readonly extractStillsUseCase: ExtractStillsUseCase) {}

  @Post('extract')
  @ApiOperation({ summary: 'Extract stills from a movie' })
  @ApiResponse({ status: 200, description: 'Stills extracted successfully' })
  @ApiResponse({ status: 400, description: 'Invalid request payload' })
  @ApiResponse({ status: 500, description: 'Internal server error' })
  async extractStills(@Body() body: ExtractStillsBody) {
    const { movieId, interval } = body;

    const stills = await this.extractStillsUseCase.execute({
      movieId,
      interval,
    });

    return stills.map((still) => StillViewModel.toHTTP(still));
  }
}
