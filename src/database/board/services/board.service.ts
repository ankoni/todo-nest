import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from '../entities/board.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { CreateBoardInput } from '../inputs/create-board.input';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(BoardEntity)
        private readonly boardRepository: Repository<BoardEntity>,
    ) {}

    async createBoard(boardInput: CreateBoardInput): Promise<BoardEntity> {
        return await this.boardRepository.save({ id: v4(), ...boardInput });
    }

    async getOneBoard(id: string): Promise<BoardEntity> {
        return await this.boardRepository.findOne({ where: { id } });
    }

    async getAllBoards(): Promise<BoardEntity[]> {
        return await this.boardRepository.find();
    }

    async removeBoard(id: string): Promise<string> {
        await this.boardRepository.delete({ id });
        return id;
    }
}
