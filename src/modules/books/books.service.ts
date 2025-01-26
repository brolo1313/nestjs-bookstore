import { CreateBookDto } from './dto/create-book.dto';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { LogMethod } from 'src/core/decorators/logger.decorator';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository) { }
    @LogMethod
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    @LogMethod
    async getBookById(id: number): Promise<Book> {
        return this.booksRepository.findOneOrNotFoundFail(id);
    }

    @LogMethod
    async createBook(dto: CreateBookDto): Promise<void> {
        const book = new Book();
        book.title = dto.title;
        book.ageRestriction = dto.ageRestriction;
        book.author = dto.author;

        await this.booksRepository.save(book);
    }

    @LogMethod
    async updateBookById(id: number, dto: CreateBookDto): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(id);
    }

    async deleteBookById(id: number) {
        this.booksRepository.remove(id);
    }

}