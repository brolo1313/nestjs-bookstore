import { Book } from './../books/books.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksRepository } from './books.repository';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { JwtStrategy } from 'src/core/guards/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BooksRepository, JwtStrategy],
  controllers: [BooksController]
})
export class BooksModule {}
