import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ExtractStillsUseCase } from 'src/modules/still/useCases/extractStillsUseCase/extractStillsUseCase';
import { ExtractStillsBody } from './dto/extractStillsBody';
import { StillViewModel } from './viewModel/stillViewModel';

@ApiTags('Stills')
@Controller('stills')
export class StillController {
  constructor(private readonly extractStillsUseCase: ExtractStillsUseCase) {}

  @Post('extract')
  @ApiOperation({ summary: 'Extract stills from a movie' })
  async extractStills(@Body() body: ExtractStillsBody) {
    const { movieId, interval } = body;

    const stills = await this.extractStillsUseCase.execute({
      movieId,
      interval,
    });

    return stills.map((still) => StillViewModel.toHTTP(still));
  }
}
