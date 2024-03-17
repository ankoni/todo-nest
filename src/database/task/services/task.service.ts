import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { TaskEntity } from '../entities/task.entity'
import { Repository } from 'typeorm'
import { CreateTaskInput } from '../inputs/create-task.input'
import { TaskListService } from '../../task-list/services/task-list.service'
import { TaskListEntity } from '../../task-list/entities/task-list.entity'
import { v4 } from 'uuid'
import { getMaxOrder } from '../../../common/utils/utils'
import { UpdateTaskInput } from '../inputs/update-task.input'

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskEntity)
        private readonly taskRepository: Repository<TaskEntity>,
        private taskListService: TaskListService,
    ) {}

    async getOneTask(id: string): Promise<TaskEntity> {
        return this.taskRepository.findOne({ where: { id }})
    }

    async getAllTask(listId: string): Promise<TaskEntity[]> {
        return this.taskRepository.find({
            where: { taskList: { id: listId } },
        })
    }

    async createTask(createTaskInput: CreateTaskInput): Promise<TaskEntity> {
        const { name, taskListId } = createTaskInput
        return this.taskListService
            .getOneTaskList(taskListId)
            .then((taskList: TaskListEntity) => {
                const maxOrder = getMaxOrder(taskList.tasks)
                return this.taskRepository.save({
                    id: v4(),
                    name,
                    order: maxOrder,
                    taskList,
                })
            })
    }

    async deleteTask(id: string): Promise<string> {
        await this.taskRepository.delete({ id })
        return id
    }

    // todo доработать изменение order
    async updateTask(updateTaskInput: UpdateTaskInput): Promise<TaskEntity> {
        const { id, name, order } = updateTaskInput
        await this.taskRepository.update({ id }, { name, order })
        return await this.getOneTask(id)
    }
}
