import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskListEntity } from '../entities/task-list.entity'
import { Repository } from 'typeorm'
import { CreateTaskListInput } from '../inputs/create-task-list.input'
import { v4 } from 'uuid'
import { BoardService } from '../../board/services/board.service'
import { getMaxOrder } from '../../../common/utils/utils'
import { UpdateTaskListInput } from '../inputs/update-task-list.input'

@Injectable()
export class TaskListService {
    constructor(
        @InjectRepository(TaskListEntity)
        private readonly taskListRepository: Repository<TaskListEntity>,
        private boardService: BoardService,
    ) {}

    async getOneTaskList(id: string): Promise<TaskListEntity> {
        return this.taskListRepository.findOne({ where: { id }, relations: { tasks: true } })
    }

    async getAllTaskList(boardId: string): Promise<TaskListEntity[]> {
        return await this.taskListRepository.find({
            where: { board: { id: boardId } },
            relations: { tasks: true },
        })
    }

    async createTaskList(
        createTaskListInput: CreateTaskListInput,
    ): Promise<TaskListEntity> {
        const { name, boardId } = createTaskListInput

        return await this.boardService.getOneBoard(boardId).then((board) => {
            const maxOrder = getMaxOrder(board.taskLists)
            return this.taskListRepository.save({
                id: v4(),
                name: name,
                order: maxOrder + 1,
                board: board,
            })
        })
    }

    // todo доработать изменение order
    async updateTaskList(updateTaskListInput: UpdateTaskListInput): Promise<TaskListEntity> {
        const { id, name, order } = updateTaskListInput
        await this.taskListRepository.update({ id }, { name, order })
        return await this.getOneTaskList(id)
    }

    async deleteTaskList(id: string): Promise<string> {
        await this.taskListRepository.delete({ id })
        return id
    }
}
