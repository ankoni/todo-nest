import { Module } from '@nestjs/common'
import { BoardEntityModule } from './board/board-entity.module'
import { TaskListEntityModule } from './task-list/task-list-entity.module'
import { TaskEntityModule } from './task/task-entity.module'

@Module({
    imports: [BoardEntityModule, TaskListEntityModule, TaskEntityModule, ],
})
export class DbModule {}
