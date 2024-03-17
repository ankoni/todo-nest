import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskListEntity } from './entities/task-list.entity'
import { TaskListService } from './services/task-list.service'
import { TaskListResolver } from './resolvers/task-list.resolver'
import { BoardService } from '../board/services/board.service'
import { BoardEntity } from '../board/entities/board.entity'

@Module({
    imports: [TypeOrmModule.forFeature([TaskListEntity, BoardEntity])],
    providers: [TaskListService, TaskListResolver, BoardService],
})
export class TaskListEntityModule {}
