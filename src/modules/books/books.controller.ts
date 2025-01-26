import { CreateBookDto } from './dto/create-book.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

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

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBook(@Body() bookDto: CreateBookDto) {
        const result = await this.booksService.createBook(bookDto);
        return result
    }

    @Put(':id')
    async updateBook(@Param('id') id: number, @Body() bookDto: any) {
        const result = await this.booksService.updateBookById(id, bookDto);
        return result;
    }

    @Delete(':id')
    async deleteBook(@Param('id') id: number) {
        const result = await this.booksService.deleteBookById(id);
    }
}