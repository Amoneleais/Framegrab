import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { MovieModule } from './infra/http/modules/movie/movie.module';

@Module({
  imports: [DatabaseModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
