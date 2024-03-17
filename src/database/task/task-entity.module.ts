import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TaskEntity } from './entities/task.entity'
import { TaskListEntity } from '../task-list/entities/task-list.entity'
import { TaskService } from './services/task.service'
import { TaskResolver } from './resolvers/task.resolver'
import { TaskListService } from '../task-list/services/task-list.service'
import { BoardService } from '../board/services/board.service'
import { BoardEntity } from '../board/entities/board.entity'

@Module({
    imports: [TypeOrmModule.forFeature([ TaskEntity, TaskListEntity, BoardEntity ])],
    providers: [ TaskService, TaskResolver, TaskListService, BoardService ]
})
export class TaskEntityModule {}