import { BaseEntity } from '../../core/entity/base.entity';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('books')
export class Book extends BaseEntity {
    @Column()
    title: string;

    @Column()
    author: string;

    @Column()
    ageRestriction: number; //возрастные ограничения на книгу

    @Column({ nullable: true })
    ownerId: number; //id пользователя, который добавил книгу

    @Column({ nullable: true })
    image?: string;
}
