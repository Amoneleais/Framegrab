import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { MovieModule } from './infra/http/modules/movie/movie.module';
import { StillModule } from './infra/http/modules/still/still.module';

@Module({
  imports: [DatabaseModule, MovieModule, StillModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
