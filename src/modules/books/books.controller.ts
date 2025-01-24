import { CreateBookDto } from './dto/create-book.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @Get()
    async getAllBooks() {
        const result = await this.booksService.getAllBooks();
        return result
    }

    @Get(':id')
    async getBookById(@Param('id') id: number) {
        const result = await this.booksService.getBookById(id);
        return result
    }

    @Post()
    async createBook(@Body() bookDto: CreateBookDto) {
        const result = await this.booksService.createBook(bookDto);
        return result
    }

    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() bookDto: any) {
        // const result = await this.booksService.updateBook(id, bookDto);
    }

    // Удалить книгу
    @Delete(':id')
    async deleteBook(@Param('id') id: number) {
        // const result = await this.booksService.deleteBook(id);
    }
}