import { BaseEntity } from '../../core/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BookDto } from './dto/book.dto';
import { ForbiddenException } from '@nestjs/common';

@Entity('books')
export class Book extends BaseEntity {
    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    ageRestriction: number;

    @Column({ nullable: true })
    ownerId: number;

    @Column({ nullable: true })
    image?: string;

    static createBook(dto: BookDto, userId: number, userAge: number) {
        if (userAge < 18 && dto.ageRestriction >= 18) {
            throw new ForbiddenException('User is under 18');
        }

        const book = new Book();
        book.title = dto.title;
        book.ageRestriction = dto.ageRestriction;
        book.author = dto.author;
        book.ownerId = userId;
        return book;
    }

    updateBook(dto: BookDto, userId: number) {
        if (this.ownerId !== userId) {
            throw new ForbiddenException('You are not the owner of this book');
        }

        this.title = dto.title ?? this.title;
        this.author = dto.author ?? this.author;
        this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
        this.image = dto.image ?? this.image;

       return this;
    }
}
