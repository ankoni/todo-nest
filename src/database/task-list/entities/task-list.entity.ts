import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { BoardEntity } from '../../board/entities/board.entity'
import { JoinColumn } from 'typeorm'
import { TaskEntity } from '../../task/entities/task.entity'
import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
@Entity('task_list')
export class TaskListEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column()
  order: number

  @Field(() => BoardEntity, { nullable: false })
  @ManyToOne(() => BoardEntity, (board) => board.taskLists, {
      onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'board_id' })
  board: BoardEntity

  @Field(() => [TaskEntity], { defaultValue: [] })
  @OneToMany(() => TaskEntity, (task) => task.taskList)
  tasks: TaskEntity[]
}
