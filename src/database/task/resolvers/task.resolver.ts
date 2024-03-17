import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskService } from '../services/task.service'
import { TaskEntity } from '../entities/task.entity'
import { CreateTaskInput } from '../inputs/create-task.input'
import { UpdateTaskInput } from '../inputs/update-task.input'

@Resolver()
export class TaskResolver {
    constructor(private readonly taskService: TaskService) {}

    @Query(() => TaskEntity)
    async getOneTask(@Args('id') id: string): Promise<TaskEntity> {
        return await this.taskService.getOneTask(id)
    }

    @Query(() => [TaskEntity])
    async getAllTask(@Args('listId') listId: string): Promise<TaskEntity[]> {
        return await this.taskService.getAllTask(listId)
    }

    @Mutation(() => TaskEntity)
    async createTask(
        @Args('createTask') createTaskInput: CreateTaskInput,
    ): Promise<TaskEntity> {
        return await this.taskService.createTask(createTaskInput)
    }

    @Mutation(() => TaskEntity)
    async updateTask(@Args('updateTask') updateTaskInput: UpdateTaskInput): Promise<TaskEntity> {
        return this.taskService.updateTask(updateTaskInput)
    }

    @Mutation(() => String)
    async deleteTask(@Args('id') id: string): Promise<string> {
        return this.taskService.deleteTask(id)
    }
}
