import { CreateBookDto } from './dto/create-book.dto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { LogMethod } from 'src/core/decorators/logger.decorator';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository, private usersRepository: UsersRepository) { }
    @LogMethod
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    @LogMethod
    async getBookById(id: number): Promise<Book> {
        return this.booksRepository.findOneOrNotFoundFail(id);
    }

    @LogMethod
    async createBook(dto: CreateBookDto, userId: number) {
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);
        
        const newBook = Book.createBook(dto, user.id, user.age);

        const resultFromBd = await this.booksRepository.save(newBook);

        return resultFromBd;
    }

    @LogMethod
    async updateBookById(id: number, dto: CreateBookDto): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(id);
    }

    async deleteBookById(id: number) {
        this.booksRepository.remove(id);
    }

}