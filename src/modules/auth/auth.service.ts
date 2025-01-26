import { UsersRepository } from './../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository) { }
    async validateUser(email: string, password: string): Promise<{userId: number}> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid password');
        }

        return {
            userId: user.id,
        }
    }

    async login(dto: { email: string; password: string }) {
        const user = await this.validateUser(dto.email, dto.password);

        return user;
    }
}
