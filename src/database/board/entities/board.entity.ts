import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TaskListEntity } from '../../task-list/entities/task-list.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

// @ts-ignore
@ObjectType()
@Entity('board')
export class BoardEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field(() => [TaskListEntity], { defaultValue: [] })
  @OneToMany(() => TaskListEntity, (taskList) => taskList.board)
  taskLists: TaskListEntity[];
}
