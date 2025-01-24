import { CreateBookDto } from './dto/create-book.dto';
import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';

@Injectable()
export class BooksService {
 constructor(private readonly booksRepository: BooksRepository) {}

 async getAllBooks(): Promise<Book[]> {
  return this.booksRepository.findAll();
 }

 async getBookById(id: number): Promise<Book> {
  return this.booksRepository.findOneOrNotFoundFail(id);
 }

 async createBook(dto: CreateBookDto): Promise<void> {
  const book = new Book();
  book.title = dto.title;
  book.ageRestriction = dto.ageRestriction;
  book.author = dto.author;

  await this.booksRepository.save(book);
 }
}