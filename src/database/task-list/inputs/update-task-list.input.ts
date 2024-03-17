import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTaskListInput {
    @Field({ nullable: false })
    id: string

    @Field()
    name?: string

    @Field()
    order?: number
}