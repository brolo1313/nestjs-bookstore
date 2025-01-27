import { BookDto } from './dto/book.dto';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth-guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllBooks() {
        const result = await this.booksService.getAllBooks();
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getBookById(@Param('id') id: number) {
        const result = await this.booksService.getBookById(id);
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createBook(@Body() bookDto: BookDto, @Request() req : any) {
        const result = await this.booksService.createBook(bookDto, req.user.userId);
        return result
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async updateBook(@Param('id') id: number,  @Request() req : any,  @Body() bookDto: any) {
        const result = await this.booksService.updateBookById( req.user.userId, id, bookDto);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteBook(@Param('id') bookId: number) {
        await this.booksService.deleteBookById(bookId);
    }
}