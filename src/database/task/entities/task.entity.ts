import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { TaskListEntity } from '../../task-list/entities/task-list.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity('task_item')
export class TaskEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ nullable: true })
  description: string

  @Field()
  @Column()
  order: number

  @ManyToOne(() => TaskListEntity, (taskList) => taskList.tasks, {
      onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'list_id' })
  taskList: TaskListEntity
}
