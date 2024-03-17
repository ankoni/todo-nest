import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BoardService } from '../services/board.service';
import { BoardEntity } from '../entities/board.entity';
import { CreateBoardInput } from '../inputs/create-board.input';

@Resolver()
export class BoardResolver {
  constructor(private readonly boardService: BoardService) {
  }

  @Mutation(() => BoardEntity)
  async createBoard(
    @Args('createBoard') createBoardInput: CreateBoardInput
  ): Promise<BoardEntity> {
    return await this.boardService.createBoard(createBoardInput);
  }

  @Mutation(() => String)
  async removeBoard(@Args('id') id: string): Promise<string> {
    return await this.boardService.removeBoard(id);
  }

  @Query(() => BoardEntity)
  async getOneBoard(@Args('id') id: string): Promise<BoardEntity> {
    return await this.boardService.getOneBoard(id);
  }

  @Query(() => [BoardEntity])
  async getAllBoards(): Promise<BoardEntity[]> {
    return await this.boardService.getAllBoards();
  }
}
