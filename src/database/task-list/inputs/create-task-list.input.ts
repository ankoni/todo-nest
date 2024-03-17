import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateTaskListInput {
    @Field()
    boardId: string

    @Field({ nullable: false })
    name: string
}
