import { BaseEntity } from '../../core/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
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

    static createBook(dto: CreateBookDto, userId: number, userAge: number) {
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
}
