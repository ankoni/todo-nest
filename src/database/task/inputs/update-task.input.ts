import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UpdateTaskInput {
    @Field({ nullable: false })
    id: string

    @Field({ nullable: true })
    name?: string

    @Field({ nullable: true })
    order?: number
}
