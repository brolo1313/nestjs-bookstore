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
        console.log('userId', userId);
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);

        if (user.age < 18 && dto.ageRestriction >= 18) {
            throw new ForbiddenException('User is under 18');
        }

        const book = new Book();
        book.title = dto.title;
        book.ageRestriction = dto.ageRestriction;
        book.author = dto.author;
        book.ownerId = userId;

        const result = await this.booksRepository.save(book);

        return result;
    }

    @LogMethod
    async updateBookById(id: number, dto: CreateBookDto): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(id);
    }

    async deleteBookById(id: number) {
        this.booksRepository.remove(id);
    }

}