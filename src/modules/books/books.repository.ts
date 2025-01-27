import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './books.entity';

@Injectable()
export class BooksRepository {
  constructor(
    @InjectRepository(Book)
    private readonly booksORMRepository: Repository<Book>,
  ) {}

  async save(book: Book): Promise<Book> {
    return this.booksORMRepository.save(book);
  }

  async findAll(): Promise<Book[]> {
    return this.booksORMRepository.find();
  }

  async findOneOrNotFoundFail(id: number): Promise<Book> {
    const result = await this.booksORMRepository.findOne({ where: { id } });

    if (!result) {
      throw new NotFoundException('book not found');
    }

    return result;
  }

  async remove(id: number): Promise<any> {
    const result =  await this.booksORMRepository.delete(id);
    return result;
  }
}