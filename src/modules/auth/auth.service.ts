import { UsersRepository } from './../users/users.repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(private usersRepository: UsersRepository, private jwtService: JwtService) { }
    async validateUser(email: string, password: string): Promise<{ userId: number }> {
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

    async login(userId: number) {
        const token = this.jwtService.sign({ userId });

        return {
            accessToken: token,
            userId: userId
        };
    }
}
