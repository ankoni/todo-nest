import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './entities/board.entity';
import { BoardService } from './services/board.service';
import { BoardResolver } from './resolvers/board.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardService, BoardResolver],
})
export class BoardEntityModule {}
