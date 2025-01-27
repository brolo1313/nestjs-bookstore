import { BookDto } from './dto/book.dto';
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
    async createBook(dto: BookDto, userId: number) {
        const user = await this.usersRepository.findByIdOrNotFoundFail(userId);
        const newBook = Book.createBook(dto, user.id, user.age);
        const resultFromBd = await this.booksRepository.save(newBook);

        return resultFromBd;
    }

    @LogMethod
    async updateBookById(userId: number, bookId: number, dto: BookDto) {
        const book = await this.booksRepository.findOneOrNotFoundFail(bookId);
        const updatedBook = book.updateBook(dto, userId);
        const resultFromBd = await this.booksRepository.save(updatedBook);

        return resultFromBd;
    }

    async deleteBookById(id: number) {
        return this.booksRepository.remove(id);
    }

}