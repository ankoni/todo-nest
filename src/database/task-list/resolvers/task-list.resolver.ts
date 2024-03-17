import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TaskListEntity } from '../entities/task-list.entity'
import { TaskListService } from '../services/task-list.service'
import { CreateTaskListInput } from '../inputs/create-task-list.input'
import { UpdateTaskListInput } from '../inputs/update-task-list.input'

@Resolver()
export class TaskListResolver {
    constructor(private readonly taskListService: TaskListService) {}

    @Query(() => TaskListEntity)
    async getOneTaskList(@Args('id') id: string): Promise<TaskListEntity> {
        return await this.taskListService.getOneTaskList(id)
    }

    @Query(() => [TaskListEntity])
    async getAllTaskList(
        @Args('boardId') boardId: string,
    ): Promise<TaskListEntity[]> {
        return await this.taskListService.getAllTaskList(boardId)
    }

    @Mutation(() => TaskListEntity)
    async createTaskList(
        @Args('createTaskList') createTaskListInput: CreateTaskListInput,
    ): Promise<TaskListEntity> {
        return await this.taskListService.createTaskList(createTaskListInput)
    }

    @Mutation(() => TaskListEntity)
    async updateTaskList(
        @Args('updateTaskList') updateTaskListInput: UpdateTaskListInput,
    ): Promise<TaskListEntity> {
        return this.taskListService.updateTaskList(updateTaskListInput)
    }

    @Mutation(() => String)
    async removeTaskList(@Args('id') id: string): Promise<string> {
        return this.taskListService.deleteTaskList(id)
    }
}
